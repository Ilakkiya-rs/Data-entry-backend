// src/export/export.module.ts
import { Module } from '@nestjs/common';
import { ExportController } from './export.controller';
import { ExportService } from './export.service';
import { RecordsService } from 'src/record/record.service';
import { AuditService } from 'src/audit/audit.service'; // ✅ Import this
import { AuditModule } from 'src/audit/audit.module';

@Module({
   imports: [AuditModule], 
  controllers: [ExportController],
  providers: [
    
    ExportService,
    RecordsService,
    AuditService // ✅ Add this
  ],
})
export class ExportModule {}


