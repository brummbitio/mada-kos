/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: any }>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(
        'Token tidak ditemukan, silakan login terlebih dahulu',
      );
    }

    try {
      // Verifikasi token menggunakan Secret Key (Pastikan sama dengan di AuthModule)
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'RAHASIA_NEGARA_123', // Nanti ganti pakai process.env.JWT_SECRET
      });
      // Tempelkan data user ke object request agar bisa dipakai di Controller
      request.user = payload;
    } catch {
      throw new UnauthorizedException(
        'Token tidak valid atau sudah kadaluwarsa',
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // Format header: "Authorization: Bearer <token>"
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
