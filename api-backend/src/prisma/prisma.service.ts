import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // Fungsi ini dijalankan saat aplikasi NestJS pertama kali nyala
  async onModuleInit() {
    await this.$connect();
    console.log('🚀 Database connected successfully');
  }

  // Fungsi ini dijalankan saat aplikasi dimatikan (misal: saat restart)
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
