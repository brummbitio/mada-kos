import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  IsEnum,
  IsOptional,
} from 'class-validator';

// Enum Status Kamar (Biar konsisten sama database)
export enum RoomStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  MAINTENANCE = 'MAINTENANCE',
}

export class CreateRoomDto {
  @IsUUID()
  @IsNotEmpty()
  roomTypeId: string; // Kamar ini tipe apa? (Deluxe/Standard?)

  @IsString()
  @IsNotEmpty()
  roomNumber: string; // Contoh: "101", "A-20"

  @IsNumber()
  floor: number; // Lantai berapa?

  // --- Koordinat Denah (Fitur "Bioskop") ---
  @IsNumber()
  xPos: number; // Posisi Horizontal (0-100%)

  @IsNumber()
  yPos: number; // Posisi Vertikal (0-100%)

  @IsEnum(RoomStatus)
  @IsOptional()
  status?: RoomStatus; // Default: AVAILABLE
}
