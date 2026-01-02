import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async simulateWebhook(orderId: string) {
    // 1. Cari Invoice berdasarkan Order ID dari Midtrans
    const invoice = await this.prisma.invoice.findUnique({
      where: { midtransOrderId: orderId },
      include: { lease: true },
    });

    if (!invoice) {
      throw new NotFoundException('Invoice tidak ditemukan');
    }

    // 2. Gunakan Transaction untuk update status serentak
    return this.prisma.$transaction(async (tx) => {
      // A. Update status Invoice
      await tx.invoice.update({
        where: { id: invoice.id },
        data: {
          status: 'SETTLEMENT',
          paymentDate: new Date(),
          paymentMethod: 'SIMULATED_BANK_TRANSFER',
        },
      });

      // B. Update status Lease (Kontrak) menjadi ACTIVE
      await tx.lease.update({
        where: { id: invoice.leaseId },
        data: { status: 'ACTIVE' },
      });

      // C. (Opsional) Update status User agar diminta verifikasi KTP
      await tx.user.update({
        where: { id: invoice.lease.tenantId },
        data: { tenantStatus: 'WAITING_FOR_VERIFICATION' },
      });

      return {
        message: 'Pembayaran berhasil disimulasikan',
        orderId: orderId,
        newStatus: 'SETTLEMENT',
        leaseStatus: 'ACTIVE',
      };
    });
  }
}
