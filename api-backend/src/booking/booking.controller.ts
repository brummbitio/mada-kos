import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { BookingService } from './booking.service.js';
import { CreateBookingDto } from './dto/create-booking.dto.js';
import { AuthGuard } from '../auth/auth.guard.js'; // Pastikan path ini sesuai dengan lokasi AuthGuard kamu

interface AuthenticatedRequest {
  user: {
    sub: string;
  };
}

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(AuthGuard) // Endpoint ini sekarang dilindungi (Wajib Login)
  @Post()
  create(
    @Request() req: AuthenticatedRequest,
    @Body() createBookingDto: CreateBookingDto,
  ) {
    // req.user biasanya diisi oleh AuthGuard setelah verifikasi Token
    const userId = req.user.sub; // 'sub' biasanya berisi ID User di JWT standar
    return this.bookingService.createBooking(userId, createBookingDto);
  }
}
