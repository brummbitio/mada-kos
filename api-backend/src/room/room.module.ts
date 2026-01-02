import { Module } from '@nestjs/common';
import { RoomService } from './room.service.js';
import { RoomController } from './room.controller.js';

@Module({
  providers: [RoomService],
  controllers: [RoomController],
})
export class RoomModule {}
