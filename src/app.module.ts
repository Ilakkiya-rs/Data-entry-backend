import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecordsModule } from './record/record.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { BatchModule } from './batch/batch.module';
import { AuditController } from './audit/audit.controller';
import { AuditService } from './audit/audit.service';
import { AuditModule } from './audit/audit.module';
import { AuthModule } from './auth/auth.module';
import { AssignmentModule } from './assignment/assignment.module';
import { ReviewController } from './review/review.controller';
import { ReviewService } from './review/review.service';
import { ReviewModule } from './review/review.module';
import { ServiceController } from './module/service/service.controller';
import { ReportController } from './report/report.controller';
import { ReportModule } from './report/report.module';
import { ReportService } from './report/report.service';
import { ExportService } from './export/export.service';
import { ExportModule } from './export/export.module';


@Module({
  imports: [RecordsModule, UserModule, BatchModule, AuditModule, AuthModule, AssignmentModule, ReviewModule, ReportModule],
  controllers: [AppController, UserController, AuditController, ReviewController, ServiceController, ReportController],
  providers: [AppService, UserService, AuditService, ReviewService, ReportService, ExportService],
})
export class AppModule {}
