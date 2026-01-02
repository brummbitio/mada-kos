import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterTenantDto } from './dto/register-tenant.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TenantService {
  constructor(private prisma: PrismaService) {}

  // Fungsi untuk mengambil profil detail + Kontrak Aktif + Daftar Tagihan Terbaru
  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        // Kita ambil data kontrak (lease) yang sedang aktif
        leases: {
          where: { status: 'ACTIVE' },
          include: {
            room: {
              include: { roomType: true },
            },
            // Ambil juga tagihan-tagihan yang terkait dengan kontrak ini
            invoices: {
              orderBy: { createdAt: 'desc' }, // Tagihan terbaru di atas
            },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User tidak ditemukan');
    }

    // Hapus password sebelum dikirim ke frontend demi keamanan
    const { password: _password, ...result } = user; // eslint-disable-line @typescript-eslint/no-unused-vars
    return result;
  }

  // Fungsi khusus jika Frontend ingin halaman "Riwayat Tagihan" yang lebih lengkap
  async getInvoices(userId: string) {
    return this.prisma.invoice.findMany({
      where: {
        lease: {
          tenantId: userId,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        lease: {
          include: {
            room: true,
          },
        },
      },
    });
  }

  async registerTenant(data: RegisterTenantDto) {
    // 1. Cek Ketersediaan Kamar
    const room = await this.prisma.room.findUnique({
      where: { id: data.roomId },
      include: { roomType: true },
    });

    if (!room) throw new NotFoundException('Kamar tidak ditemukan');
    if (room.status !== 'AVAILABLE')
      throw new BadRequestException(
        'Kamar sudah terisi atau sedang maintenance',
      );

    // 2. Hitung Tanggal Selesai & Total Harga
    const startDate = new Date(data.startDate);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + data.rentDuration); // Tambah bulan otomatis

    // Tentukan harga berdasarkan durasi (Logic Harga Berjenjang)
    let totalAmount = 0;
    if (data.rentDuration === 1)
      totalAmount = Number(room.roomType.price1Month);
    else if (data.rentDuration === 3)
      totalAmount = Number(room.roomType.price3Months);
    else if (data.rentDuration === 6)
      totalAmount = Number(room.roomType.price6Months);
    else totalAmount = Number(room.roomType.price1Month) * data.rentDuration; // Default kali bulanan

    // 3. Generate Password Default (Hash)
    // Password default: 4 digit terakhir nomor HP
    const defaultPass = data.phoneNumber.slice(-4);
    const hashedPassword = await bcrypt.hash(defaultPass, 10);

    // 4. DATABASE TRANSACTION (Semua atau Tidak Sama Sekali)
    return this.prisma.$transaction(async (tx) => {
      // A. Buat User (Tenant)
      // Cek dulu kalau email udah ada (penghuni lama balik lagi)
      let user = await tx.user.findUnique({ where: { email: data.email } });

      if (!user) {
        user = await tx.user.create({
          data: {
            email: data.email,
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
            password: hashedPassword,
            role: 'TENANT',
            addressKTP: data.addressKTP,
            emergencyName: data.emergencyName,
            emergencyPhone: data.emergencyPhone,
            referralCode: `REF-${Math.random().toString(36).substr(2, 6).toUpperCase()}`, // Auto generate referral
          },
        });
      }

      // B. Buat Lease (Kontrak)
      const lease = await tx.lease.create({
        data: {
          tenantId: user.id,
          roomId: room.id,
          startDate: startDate,
          endDate: endDate,
          rentDuration: data.rentDuration,
          totalAmount: totalAmount,
          status: 'ACTIVE',
        },
      });

      // C. Buat Invoice Pertama (Tagihan Check-in)
      const invoice = await tx.invoice.create({
        data: {
          leaseId: lease.id,
          amount: totalAmount,
          type: 'RENT',
          status: 'PENDING',
          periodStart: startDate,
          periodEnd: endDate,
          midtransOrderId: `INV-${Date.now()}`, // ID sementara, nanti diganti pas integrasi Midtrans
        },
      });

      // D. Update Status Kamar jadi OCCUPIED
      await tx.room.update({
        where: { id: room.id },
        data: { status: 'OCCUPIED' },
      });

      return {
        message: 'Penghuni berhasil didaftarkan',
        tenant: user,
        lease,
        invoice,
        room: room.roomNumber,
      };
    });
  }

  // Fungsi baru untuk memperbarui profil oleh penghuni sendiri
  async updateProfile(userId: string, data: UpdateProfileDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User tidak ditemukan');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        ...data,
        // Setelah upload KTP, ubah status menjadi menunggu verifikasi jika belum
        tenantStatus: data.ktpPhotoUrl
          ? 'WAITING_FOR_VERIFICATION'
          : user.tenantStatus,
      },
    });
  }

  // --- LOGIC VERIFIKASI YANG TADI KURANG ---
  async verifyTenant(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Penghuni tidak ditemukan');
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        tenantStatus: 'VERIFIED',
      },
    });
  }

  // Fungsi untuk Admin melihat daftar verifikasi
  async getPendingVerifications() {
    return this.prisma.user.findMany({
      where: { tenantStatus: 'WAITING_FOR_VERIFICATION' },
      select: {
        id: true,
        fullName: true,
        email: true,
        ktpPhotoUrl: true,
        createdAt: true,
      },
    });
  }
}
