import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'RAHASIA_NEGARA_123', // Nanti pindahin ke .env ya
      signOptions: { expiresIn: '1d' }, // Token berlaku 1 hari
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
