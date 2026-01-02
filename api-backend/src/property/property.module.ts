import { Module } from '@nestjs/common';
import { PropertyService } from './property.service.js';
import { PropertyController } from './property.controller.js';

@Module({
  providers: [PropertyService],
  controllers: [PropertyController],
})
export class PropertyModule {}
