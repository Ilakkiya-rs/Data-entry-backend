import { Controller, Get, Query } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('status')
  getByStatus(@Query('status') status: string) {
    return this.reportService.generateByStatus(status);
  }

  @Get('reviewer')
  getByReviewer(@Query('reviewer') reviewer: string) {
    return this.reportService.generateByReviewer(reviewer);
  }

  @Get('all')
  getAll() {
    return this.reportService.generateAll();
  }
}
