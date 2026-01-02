import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { PropertyService } from './property.service.js';
import { CreatePropertyDto } from './dto/create-property.dto.js';
// Nanti kita uncomment ini kalau mau protect endpoint pakai Token
// import { AuthGuard } from '../auth/auth.guard.js';

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertyService.create(createPropertyDto);
  }

  @Get()
  findAll() {
    return this.propertyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyService.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('isActive') isActive: boolean) {
    return this.propertyService.updateStatus(id, isActive);
  }
}
