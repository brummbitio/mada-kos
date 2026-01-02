import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBookingDto } from './dto/create-booking.dto.js';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  // Tambahkan parameter userId yang didapat dari Token
  async createBooking(userId: string, data: CreateBookingDto) {
    // 1. Validasi Kamar
    const room = await this.prisma.room.findUnique({
      where: { id: data.roomId },
      include: { roomType: true },
    });

    if (!room) throw new NotFoundException('Kamar tidak ditemukan');
    if (room.status !== 'AVAILABLE')
      throw new BadRequestException('Kamar tidak tersedia');

    // 2. Hitung Harga Total
    let totalAmount = 0;
    // Logika harga mengambil dari RoomType sesuai durasi
    if (data.rentDuration === 1)
      totalAmount = Number(room.roomType.price1Month);
    else if (data.rentDuration === 3)
      totalAmount = Number(room.roomType.price3Months);
    else if (data.rentDuration === 6)
      totalAmount = Number(room.roomType.price6Months);
    else totalAmount = Number(room.roomType.price1Month) * data.rentDuration;

    // 3. Transaction: Buat Lease -> Invoice -> Update Room
    return this.prisma.$transaction(async (tx) => {
      // A. Buat Kontrak (Lease) - Status PENDING_PAYMENT
      const lease = await tx.lease.create({
        data: {
          tenantId: userId, // Gunakan ID dari user yang sedang login
          roomId: room.id,
          startDate: new Date(data.startDate),
          // Hitung tanggal selesai otomatis
          endDate: new Date(
            new Date(data.startDate).setMonth(
              new Date(data.startDate).getMonth() + data.rentDuration,
            ),
          ),
          rentDuration: data.rentDuration,
          totalAmount: totalAmount,
          status: 'PENDING_PAYMENT', // Belum aktif sebelum bayar
        },
      });

      // B. Buat Invoice Tagihan Awal
      const invoice = await tx.invoice.create({
        data: {
          leaseId: lease.id,
          amount: totalAmount,
          type: 'RENT',
          status: 'PENDING',
          periodStart: lease.startDate,
          periodEnd: lease.endDate,
          midtransOrderId: `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`, // ID unik untuk Midtrans
        },
      });

      // C. Kunci Kamar Sementara
      // Status diubah agar tidak bisa dibooking orang lain saat proses bayar
      await tx.room.update({
        where: { id: room.id },
        data: { status: 'OCCUPIED' },
      });

      return {
        message: 'Booking berhasil, silakan lakukan pembayaran',
        bookingId: lease.id,
        invoiceId: invoice.id,
        amount: totalAmount,
        roomNumber: room.roomNumber,
        midtransOrderId: invoice.midtransOrderId,
      };
    });
  }
}
