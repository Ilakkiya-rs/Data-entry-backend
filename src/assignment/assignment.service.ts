import { Injectable, NotFoundException } from '@nestjs/common';
import { RecordsService } from '../record/record.service';

@Injectable()
export class AssignmentService {
  constructor(private readonly recordsService: RecordsService) {}

  assignRecords(ids: number[], username: string): number[] {
    const updated: number[] = [];

    ids.forEach(id => {
      const record = this.recordsService.findOne(id);
      if (!record) throw new NotFoundException(`Record ${id} not found`);

      this.recordsService.update(id, { assignedTo: username });
      updated.push(id);
    });

    return updated;
  }

  unassignRecords(ids: number[]): number[] {
    const updated: number[] = [];

    ids.forEach(id => {
      const record = this.recordsService.findOne(id);
      if (!record) throw new NotFoundException(`Record ${id} not found`);

      this.recordsService.update(id, { assignedTo: undefined });
      updated.push(id);
    });

    return updated;
  }
}
