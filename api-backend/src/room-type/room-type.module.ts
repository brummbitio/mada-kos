import { Module } from '@nestjs/common';
import { RoomTypeService } from './room-type.service.js';
import { RoomTypeController } from './room-type.controller.js';

@Module({
  providers: [RoomTypeService],
  controllers: [RoomTypeController],
})
export class RoomTypeModule {}
