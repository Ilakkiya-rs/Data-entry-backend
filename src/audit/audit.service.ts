import { Injectable } from '@nestjs/common';
import { AuditLog } from './audit.entity';

@Injectable()
export class AuditService {
  private logs: AuditLog[] = [];
  private idCounter = 1;

log(action: Omit<AuditLog, 'id' | 'timestamp'>): AuditLog {
  console.log('AUDIT SERVICE CALLED WITH:', action); // ✅ Debug line

  const entry: AuditLog = {
    id: this.idCounter++,
    ...action,
    timestamp: new Date(),
  };
  this.logs.push(entry);
  return entry;
}


  findAll(): AuditLog[] {
    return this.logs;
  }

  findByRecord(recordId: number): AuditLog[] {
    return this.logs.filter(log => log.recordId === recordId);
  }

  findByUser(username: string): AuditLog[] {
    return this.logs.filter(log => log.username === username);
  }
}
