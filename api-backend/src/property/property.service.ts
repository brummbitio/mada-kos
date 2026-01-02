import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePropertyDto } from './dto/create-property.dto.js';

@Injectable()
export class PropertyService {
  constructor(private prisma: PrismaService) {}

  // 1. Create Property (Sesuai Skema Lengkap)
  async create(data: CreatePropertyDto) {
    return this.prisma.property.create({
      data: {
        name: data.name,
        address: data.address,
        gender: data.gender,
        description: data.description,
        lat: data.lat,
        lng: data.lng,
        isActive: data.isActive ?? true, // Default true jika tidak diisi
        bannerUrl: data.bannerUrl,
        video360Url: data.video360Url,
        ownerId: data.ownerId, // Relasi ke User (Owner)
      },
    });
  }

  // 2. Get All Properties (Dashboard List)
  async findAll() {
    return this.prisma.property.findMany({
      include: {
        _count: {
          select: { roomTypes: true, complaints: true }, // Hitung total tipe kamar & komplain
        },
        owner: {
          select: { fullName: true, email: true }, // Tampilkan nama Owner
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // 3. Get Detail Property (Dashboard Detail)
  async findOne(id: string) {
    return this.prisma.property.findUnique({
      where: { id },
      include: {
        roomTypes: true, // Tampilkan tipe kamar
        assets: true, // Tampilkan galeri foto
        facilities: true, // Tampilkan fasilitas
        owner: true, // Tampilkan detail owner
      },
    });
  }

  // 4. Update Status (Aktif/Non-aktif)
  async updateStatus(id: string, isActive: boolean) {
    return this.prisma.property.update({
      where: { id },
      data: { isActive },
    });
  }
}
