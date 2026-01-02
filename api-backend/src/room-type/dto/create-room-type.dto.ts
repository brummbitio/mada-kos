import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateRoomTypeDto {
  @IsUUID()
  @IsNotEmpty()
  propertyId: string; // Tipe kamar ini milik properti mana?

  @IsString()
  @IsNotEmpty()
  name: string; // Contoh: "Deluxe with View"

  @IsString()
  @IsOptional()
  description?: string;

  // --- Harga Berjenjang (Wajib) ---
  @IsNumber()
  price1Month: number;

  @IsNumber()
  price3Months: number;

  @IsNumber()
  price6Months: number;

  // --- Fasilitas (Array String) ---
  @IsArray()
  @IsString({ each: true }) // Pastikan isi array-nya string semua
  facilities: string[]; // Contoh: ["AC", "WiFi", "Water Heater"]
}
