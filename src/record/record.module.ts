import { Module } from '@nestjs/common';
import { RecordsService } from './record.service';
import { RecordsController } from './record.controller';
import { AuditModule } from '../audit/audit.module'; // ✅ import this

@Module({
  imports: [AuditModule], // ✅ include it here
  controllers: [RecordsController],
  providers: [RecordsService],
  exports: [RecordsService],
})
export class RecordsModule {}

