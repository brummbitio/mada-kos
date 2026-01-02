import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // --- Fitur Register Baru ---
  async register(data: RegisterDto) {
    // 1. Cek apakah email atau nomor HP sudah terdaftar
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { phoneNumber: data.phoneNumber }],
      },
    });

    if (existingUser) {
      throw new ConflictException('Email atau nomor telepon sudah digunakan');
    }

    // 2. Hash Password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 3. Simpan ke Database
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        role: 'TENANT', // Otomatis jadi Tenant
        referralCode: `MADA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        tenantStatus: 'INACTIVE', // Status awal sebelum booking/bayar
      },
    });

    return {
      message: 'Registrasi berhasil, silakan login',
      userId: user.id,
    };
  }

  // --- Fungsi Login yang sudah ada ---
  async login(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new ConflictException('User tidak ditemukan');

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) throw new ConflictException('Password salah');

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    };
  }
}
