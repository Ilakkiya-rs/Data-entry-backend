import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { RecordsService } from 'src/record/record.service';
import { AuditModule } from 'src/audit/audit.module';

@Module({
    imports: [AuditModule],
  controllers: [ReportController],
  providers: [ReportService, RecordsService],
})
export class ReportModule {}
