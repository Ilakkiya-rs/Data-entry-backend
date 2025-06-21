import { Injectable } from '@nestjs/common';
import { RecordsService } from 'src/record/record.service';
import { Record } from 'src/record/record.entity';
import { Parser } from 'json2csv';

@Injectable()
export class ExportService {
  constructor(private readonly recordsService: RecordsService) {}

  async exportToCSVByStatus(status: string): Promise<string> {
    const records = await this.recordsService.findAll();
    const filtered = records.filter(r => r.status === status);
    return this.convertToCSV(filtered);
  }

  async exportToCSVByReviewer(reviewer: string): Promise<string> {
    const records = await this.recordsService.findAll();
    const filtered = records.filter(r => r.reviewedBy === reviewer);
    return this.convertToCSV(filtered);
  }

  async exportAll(): Promise<string> {
    const records = await this.recordsService.findAll();
    return this.convertToCSV(records);
  }
private convertToCSV(data: Record[]): string {
  const fields = [
    'id',
    'propertyAddress',
    'transactionDate',
    'borrowerName',
    'loanOfficerName',
    'nmlsId',
    'loanAmount',
    'salesPrice',
    'loanTerm',
    'apn',
    'enteredBy',
    'enteredByDate',
    'status',
    'locked',
    'lockedBy',
    'lockedAt',
    'reviewedBy',
    'reviewedByDate',
    'reviewNote',
    'batchId',
    'assignedTo',
  ];

  if (!data || data.length === 0) {
    // Return CSV headers only (optional) or a message as CSV with headers
    const parser = new Parser({ fields });
    return parser.parse([]); // This returns CSV headers only
    // Or simply return a CSV string with headers and no rows
  }

  try {
    const parser = new Parser({ fields });
    return parser.parse(data);
  } catch (err) {
    console.error('CSV conversion failed:', err);
    throw err;
  }
}

}
