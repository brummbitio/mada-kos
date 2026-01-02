import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { RoomTypeService } from './room-type.service.js';
import { CreateRoomTypeDto } from './dto/create-room-type.dto.js';

@Controller('room-types')
export class RoomTypeController {
  constructor(private readonly roomTypeService: RoomTypeService) {}

  @Post()
  create(@Body() createRoomTypeDto: CreateRoomTypeDto) {
    return this.roomTypeService.create(createRoomTypeDto);
  }

  // Endpoint khusus: Ambil tipe kamar milik properti tertentu
  // Contoh: GET /room-types/property/ID_PROPERTI_KAMU
  @Get('property/:propertyId')
  findAllByProperty(@Param('propertyId', ParseUUIDPipe) propertyId: string) {
    return this.roomTypeService.findAllByProperty(propertyId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.roomTypeService.findOne(id);
  }
}
