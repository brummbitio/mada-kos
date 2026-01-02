import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateRoomTypeDto } from './dto/create-room-type.dto.js';

@Injectable()
export class RoomTypeService {
  constructor(private prisma: PrismaService) {}

  // 1. Create Tipe Kamar Baru
  async create(data: CreateRoomTypeDto) {
    // Cek dulu apakah propertinya ada?
    const propertyExists = await this.prisma.property.findUnique({
      where: { id: data.propertyId },
    });

    if (!propertyExists) {
      throw new NotFoundException('Properti tidak ditemukan');
    }

    return this.prisma.roomType.create({
      data: {
        name: data.name,
        description: data.description,
        price1Month: data.price1Month,
        price3Months: data.price3Months,
        price6Months: data.price6Months,
        facilities: data.facilities,
        propertyId: data.propertyId,
      },
    });
  }

  // 2. Ambil Semua Tipe Kamar berdasarkan Properti ID
  async findAllByProperty(propertyId: string) {
    return this.prisma.roomType.findMany({
      where: { propertyId },
      include: {
        _count: { select: { rooms: true } }, // Hitung ada berapa kamar di tipe ini
      },
    });
  }

  // 3. Detail Tipe Kamar
  async findOne(id: string) {
    return this.prisma.roomType.findUnique({
      where: { id },
      include: {
        images: true, // Nanti kalau udah ada fitur upload gambar
        rooms: true, // Lihat daftar kamar di tipe ini
      },
    });
  }
}
