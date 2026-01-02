import {
  IsString,
  IsOptional,
  IsInt,
  IsDateString,
  IsUrl,
} from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  gender?: string;

  @IsInt()
  @IsOptional()
  age?: number;

  @IsDateString()
  @IsOptional()
  dateOfBirth?: string;

  @IsString()
  @IsOptional()
  addressKTP?: string;

  @IsString()
  @IsOptional()
  occupation?: string;

  @IsString()
  @IsOptional()
  emergencyName?: string;

  @IsString()
  @IsOptional()
  emergencyRelation?: string;

  @IsString()
  @IsOptional()
  emergencyPhone?: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  ktpPhotoUrl?: string; // Untuk saat ini kita simpan URL foto KTP
}
