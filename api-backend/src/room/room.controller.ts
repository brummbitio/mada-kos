import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { RoomService } from './room.service.js';
import { CreateRoomDto } from './dto/create-room.dto.js';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  // Bisa dipanggil: GET /rooms?roomTypeId=ID_TIPE_KAMAR
  @Get()
  findAll(@Query('roomTypeId') roomTypeId?: string) {
    return this.roomService.findAll(roomTypeId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.roomService.findOne(id);
  }
}
