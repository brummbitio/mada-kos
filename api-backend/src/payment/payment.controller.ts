import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service.js';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // Endpoint Simulasi Webhook Midtrans
  @Post('webhook/simulate')
  async simulate(@Body() body: { orderId: string }) {
    return this.paymentService.simulateWebhook(body.orderId);
  }
}
