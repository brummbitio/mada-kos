import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { PropertyModule } from './property/property.module.js';
import { RoomTypeModule } from './room-type/room-type.module.js';
import { RoomModule } from './room/room.module.js';
import { TenantModule } from './tenant/tenant.module.js';
import { BookingModule } from './booking/booking.module.js';
import { PaymentModule } from './payment/payment.module.js';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    PropertyModule,
    RoomTypeModule,
    RoomModule,
    TenantModule,
    BookingModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
