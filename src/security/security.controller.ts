import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { SecurityService } from './security.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Security Module')
@Controller('security')
@UseGuards(AuthGuard('jwt'))
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}
  @Get()
  async findAll() {
    return await this.securityService.findAll();
  }

  @Get('/date')
  async findDateBoundary(@Query('start') start: Date, @Query('end') end: Date) {
    return this.securityService.findByDate(start, end);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.securityService.findOne(id);
  }
}
