import { Injectable } from '@nestjs/common';
import { RecordsService } from 'src/record/record.service';
import { Record } from 'src/record/record.entity';

@Injectable()
export class ReportService {
  constructor(private readonly recordsService: RecordsService) {}

  generateByStatus(status: string): Record[] {
    return this.recordsService.findAll().filter((r) => r.status === status);
  }

  generateByReviewer(reviewer: string): Record[] {
    return this.recordsService.findAll().filter((r) => r.reviewedBy === reviewer);
  }

  generateAll(): Record[] {
    return this.recordsService.findAll();
  }
}
