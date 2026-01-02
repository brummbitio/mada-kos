import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateRoomDto } from './dto/create-room.dto.js';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  // 1. Tambah Kamar Baru
  async create(data: CreateRoomDto) {
    // Validasi: Apakah Tipe Kamarnya ada?
    const roomTypeExists = await this.prisma.roomType.findUnique({
      where: { id: data.roomTypeId },
    });

    if (!roomTypeExists) {
      throw new NotFoundException('Tipe Kamar tidak ditemukan');
    }

    return this.prisma.room.create({
      data: {
        roomTypeId: data.roomTypeId,
        roomNumber: data.roomNumber,
        floor: data.floor,
        xPos: data.xPos,
        yPos: data.yPos,
        status: data.status ?? 'AVAILABLE',
      },
    });
  }

  // 2. Ambil Semua Kamar (Bisa filter by Tipe Kamar)
  async findAll(roomTypeId?: string) {
    return this.prisma.room.findMany({
      where: roomTypeId ? { roomTypeId } : {}, // Kalau ada ID tipe, filter. Kalau gak, ambil semua.
      include: {
        roomType: {
          select: { name: true, price1Month: true }, // Biar tahu ini kamar tipe apa & harganya
        },
      },
      orderBy: { roomNumber: 'asc' }, // Urutkan dari kamar 101, 102...
    });
  }

  // 3. Detail Satu Kamar (Untuk cek status/penghuni)
  async findOne(id: string) {
    return this.prisma.room.findUnique({
      where: { id },
      include: {
        roomType: true,
        leases: {
          // Cek siapa yang lagi sewa (ambil yang aktif aja)
          where: { status: 'ACTIVE' },
          include: { tenant: { select: { fullName: true } } },
        },
      },
    });
  }
}
