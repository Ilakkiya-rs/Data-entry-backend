import { Injectable, NotFoundException } from '@nestjs/common';
import { RecordsService } from 'src/record/record.service';
import { AuditService } from 'src/audit/audit.service';
import { Record } from 'src/record/record.entity';

@Injectable()
export class ReviewService {
  constructor(
    private readonly recordsService: RecordsService,
    private readonly auditService: AuditService,
  ) {}

  reviewRecord(
    id: number,
    reviewer: string,
    status: 'approved' | 'rejected' | 'pending' | 'verified',
    note?: string
  ): Record {
    const record = this.recordsService.findOne(id);
    if (!record) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }

    record.status = status;
    record.reviewedBy = reviewer;
    record.reviewedByDate = new Date();
    record.reviewNote = note;

    this.auditService.log({
      actionType: 'verify',
      recordId: id,
      username: reviewer,
      details: `Record ${status}. Note: ${note ?? 'N/A'}`,
    });

    return record;
  }

  getPendingRecords(): Record[] {
    return this.recordsService.findAll().filter((r) => r.status === 'pending');
  }
}
