import { IsUUID, IsNumber, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  // Data user (email, nama, hp) dihapus karena user sudah login.
  // Backend akan mengambil ID User dari Token JWT (Request User).

  @IsUUID()
  @IsNotEmpty()
  roomId: string; // Kamar yang dipilih

  @IsDateString()
  startDate: string; // Tanggal mulai sewa (YYYY-MM-DD)

  @IsNumber()
  rentDuration: number; // Durasi sewa: 1, 3, atau 6 bulan
}
