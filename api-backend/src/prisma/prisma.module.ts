import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js'; // Gunakan .js jika ada error ESM

@Global() // Membuat modul ini bisa diakses di mana saja tanpa perlu import ulang-ulang
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Wajib diexport agar bisa dipakai modul lain
})
export class PrismaModule {}
