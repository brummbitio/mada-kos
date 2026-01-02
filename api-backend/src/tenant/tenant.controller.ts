import {
  Controller,
  Post,
  Body,
  Patch,
  UseGuards,
  Request,
  Get,
  Param,
} from '@nestjs/common';
import { TenantService } from './tenant.service.js';
import { RegisterTenantDto } from './dto/register-tenant.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';

interface AuthenticatedRequest {
  user: {
    sub: string;
  };
}

@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  // 1. Ambil data profil diri sendiri (Sangat penting untuk Frontend)
  @UseGuards(AuthGuard)
  @Get('me')
  getMe(@Request() req: AuthenticatedRequest) {
    // req.user.sub didapat dari payload JWT di AuthGuard
    return this.tenantService.getProfile(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get('invoices')
  getInvoices(@Request() req: AuthenticatedRequest) {
    return this.tenantService.getInvoices(req.user.sub);
  }

  @Post('register')
  register(@Body() registerTenantDto: RegisterTenantDto) {
    return this.tenantService.registerTenant(registerTenantDto);
  }

  // Endpoint untuk penghuni melengkapi profil
  @UseGuards(AuthGuard)
  @Patch('profile')
  updateProfile(
    @Request() req: AuthenticatedRequest,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const userId = req.user.sub;
    return this.tenantService.updateProfile(userId, updateProfileDto);
  }

  // --- ENDPOINT YANG TADI HILANG ---
  // Pastikan Anda menambahkan @Param('id') untuk mengambil ID dari URL
  @Patch('verify/:id')
  verifyTenant(@Param('id') id: string) {
    return this.tenantService.verifyTenant(id);
    // Pastikan method verifyTenant(id) sudah ada di tenant.service.ts
  }

  // Endpoint untuk Admin melihat siapa saja yang sudah upload KTP
  @UseGuards(AuthGuard)
  @Get('pending-verifications')
  getPending() {
    // Di dunia nyata, tambahkan cek apakah user ini ADMIN/SUPERADMIN
    return this.tenantService.getPendingVerifications();
  }
}
