import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsUUID,
  IsNumber,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class RegisterTenantDto {
  // --- Data Diri Penghuni ---
  @IsEmail()
  email: string;

  @IsString()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string; // Password default nanti kita ambil dari sini (misal 4 digit terakhir)

  @IsString()
  @IsOptional()
  addressKTP?: string;

  // --- Kontak Darurat ---
  @IsString()
  @IsOptional()
  emergencyName?: string;

  @IsString()
  @IsOptional()
  emergencyPhone?: string;

  // --- Data Sewa (Check-in) ---
  @IsUUID()
  roomId: string; // Mau masuk kamar mana?

  @IsDateString()
  startDate: string; // Mulai kapan? (YYYY-MM-DD)

  @IsNumber()
  rentDuration: number; // 1, 3, atau 6 bulan
}
