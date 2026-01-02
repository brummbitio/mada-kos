import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsEnum,
} from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsEnum(['PUTRA', 'PUTRI', 'CAMPUR'])
  gender: string;

  @IsString()
  description: string;

  // Koordinat Maps (Wajib Float)
  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  // Asset URLs (Optional di awal)
  @IsString()
  @IsOptional()
  bannerUrl?: string;

  @IsString()
  @IsOptional()
  video360Url?: string;

  // Jika admin ingin langsung assign Owner saat pembuatan
  @IsString()
  @IsOptional()
  ownerId?: string;
}
