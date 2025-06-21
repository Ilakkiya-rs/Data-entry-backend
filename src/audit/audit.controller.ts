import { Controller, Get, Param } from '@nestjs/common';
import { AuditService } from './audit.service';
import { AuditLog } from './audit.entity';

@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  getAll(): AuditLog[] {
    return this.auditService.findAll();
  }

  @Get('/record/:id')
  getByRecord(@Param('id') id: string): AuditLog[] {
    return this.auditService.findByRecord(+id);
  }

  @Get('/user/:username')
  getByUser(@Param('username') username: string): AuditLog[] {
    return this.auditService.findByUser(username);
  }
}
