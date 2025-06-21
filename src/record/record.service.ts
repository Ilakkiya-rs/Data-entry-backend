// import { Injectable, NotFoundException } from '@nestjs/common';
// import { Record } from './record.entity';

// @Injectable()
// export class RecordsService {
//   private records: Record[] = [];
//   private idCounter = 1;

//   create(data: Partial<Record>): Record {
    

//     const newRecord: Record = {
//       id: this.idCounter++,
//       propertyAddress: data.propertyAddress!,
//       transactionDate: new Date(data.transactionDate!),
//       borrowerName: data.borrowerName!,
//       loanOfficerName: data.loanOfficerName!,
//       nmlsId: data.nmlsId!,
//       loanAmount: data.loanAmount!,
//       salesPrice: data.salesPrice!,
//       loanTerm: data.loanTerm!,
//       apn: data.apn!,
//       enteredBy: data.enteredBy!,
//       enteredByDate: new Date(),
//       status: 'pending',
//       locked: false,
//     };

//     this.records.push(newRecord);
//     return newRecord;
//   }

//   findAll(): Record[] {
//     return this.records;
//   }

//   findOne(id: number): Record {
//     const record = this.records.find(record => record.id === id);
//     if (!record) throw new NotFoundException(`Record with ID ${id} not found`);
//     return record;
//   }

//   update(id: number, data: Partial<Record>): Record {
//     const index = this.records.findIndex(r => r.id === id);
//     if (index === -1) throw new NotFoundException(`Record with ID ${id} not found`);

//     const existing = this.records[index];
//     const updated: Record = {
//       ...existing,
//       ...data,
//       reviewedByDate: data.reviewedBy ? new Date() : existing.reviewedByDate,
//     };

//     this.records[index] = updated;
//     return updated;
//   }

//   remove(id: number): { deleted: boolean } {
//     const index = this.records.findIndex(r => r.id === id);
//     if (index === -1) throw new NotFoundException(`Record with ID ${id} not found`);
//     this.records.splice(index, 1);
//     return { deleted: true };
//   }
//   lockRecord(id: number, username: string): Record {
//   const record = this.findOne(id);

//   // Check if already locked and not expired
//   if (record.locked && !this.isLockExpired(record)) {
//     throw new Error(`Record ${id} is already locked by ${record.lockedBy}`);
//   }

//   record.locked = true;
//   record.lockedBy = username;
//   record.lockedAt = new Date();
//   return record;
// }

// unlockRecord(id: number, username: string): Record {
//   const record = this.findOne(id);

//   if (record.lockedBy !== username) {
//     throw new Error(`Only ${record.lockedBy} can unlock this record`);
//   }

//   record.locked = false;
//   record.lockedBy = null;
//   record.lockedAt = null;
//   return record;
// }

// isLockExpired(record: Record): boolean {
//   if (!record.lockedAt) return true;
//   const now = new Date().getTime();
//   const lockedAt = new Date(record.lockedAt).getTime();
//   return now - lockedAt > 10 * 60 * 1000; // 10 minutes
// }

// }

import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Record } from './record.entity';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class RecordsService {
  private records: Record[] = [];
  private idCounter = 1;

  constructor(
    @Inject(AuditService)
    private readonly auditService: AuditService,
  ) {}

 create(data: Partial<Record>): Record {
  const newRecord: Record = {
    id: this.idCounter++,
    propertyAddress: data.propertyAddress!,
    transactionDate: new Date(data.transactionDate!),
    borrowerName: data.borrowerName!,
    loanOfficerName: data.loanOfficerName!,
    nmlsId: data.nmlsId!,
    loanAmount: data.loanAmount!,
    salesPrice: data.salesPrice!,
    loanTerm: data.loanTerm!,
    apn: data.apn!,
    enteredBy: data.enteredBy!,
    enteredByDate: new Date(),
    status: 'pending',
    locked: false,
    batchId: data.batchId,
    assignedTo: data.assignedTo,
    reviewedBy: data.reviewedBy,
    reviewedByDate: data.reviewedByDate,
    reviewNote: data.reviewNote, // ✅ include this
  };

  this.records.push(newRecord);

  this.auditService.log({
    actionType: 'create',
    recordId: newRecord.id,
    username: newRecord.enteredBy,
    details: 'Record created',
  });

  return newRecord;
}

searchRecords(query: string, page: number, limit: number) {
  const lowerQuery = query.toLowerCase();

  const filtered = this.records.filter((record) =>
    record.borrowerName.toLowerCase().includes(lowerQuery) ||
    record.loanOfficerName.toLowerCase().includes(lowerQuery)
  );

  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return {
    results: paginated,
    total: filtered.length,
  };
}


  findAll(): Record[] {
    return this.records || [];
  }

  findOne(id: number): Record {
    const record = this.records.find((r) => r.id === id);
    if (!record) throw new NotFoundException(`Record with ID ${id} not found`);
    return record;
  }

  update(id: number, data: Partial<Record>): Record {
    const index = this.records.findIndex((r) => r.id === id);
    if (index === -1) throw new NotFoundException(`Record with ID ${id} not found`);

    const existing = this.records[index];
    const updated = {
      ...existing,
      ...data,
      reviewedByDate: data.reviewedBy ? new Date() : existing.reviewedByDate,
    };
    this.records[index] = updated;

    this.auditService.log({
      actionType: 'update',
      recordId: id,
      username: data.reviewedBy ?? existing.enteredBy,
      details: 'Record updated or verified',
    });

    return updated;
  }

  remove(id: number): { deleted: boolean } {
    const before = this.records.length;
    this.records = this.records.filter((r) => r.id !== id);

    this.auditService.log({
      actionType: 'delete',
      recordId: id,
      username: 'system',
      details: 'Record deleted',
    });

    return { deleted: this.records.length < before };
  }

  lockRecord(id: number, username: string): Record {
    const record = this.findOne(id);

    if (record.locked && !this.isLockExpired(record)) {
      throw new Error(`Record ${id} is already locked by ${record.lockedBy}`);
    }

    record.locked = true;
    record.lockedBy = username;
    record.lockedAt = new Date();

    this.auditService.log({
      actionType: 'lock',
      recordId: id,
      username,
      details: 'Record locked',
    });

    return record;
  }

  unlockRecord(id: number, username: string): Record {
    const record = this.findOne(id);

    if (record.lockedBy !== username) {
      throw new Error(`Only ${record.lockedBy} can unlock this record`);
    }

    record.locked = false;
    record.lockedBy = null;
    record.lockedAt = null;

    this.auditService.log({
      actionType: 'unlock',
      recordId: id,
      username,
      details: 'Record unlocked',
    });

    return record;
  }

  isLockExpired(record: Record): boolean {
    if (!record.lockedAt) return true;
    const now = new Date().getTime();
    const lockedAt = new Date(record.lockedAt).getTime();
    return now - lockedAt > 10 * 60 * 1000; // 10 minutes
  }
 findPaginated(
  username: string,
  page = 1,
  limit = 10,
  batchId?: string,
): { records: Record[]; total: number } {
  const start = (page - 1) * limit;

  const filtered = this.records.filter(
    (record) =>
      record.assignedTo === username &&
      (!batchId || record.batchId === batchId)
  );

  const paginated = filtered.slice(start, start + limit);

  return {
    records: paginated,
    total: filtered.length,
  };
}


}
