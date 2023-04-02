import { Controller, Get, Param, Query } from '@nestjs/common';
import { SecurityService } from './security.service';
@Controller('security')
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
