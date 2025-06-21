// export class AuditLog {
//   id: number;
//   actionType: 'create' | 'update' | 'verify' | 'lock' | 'unlock' | 'delete';
//   recordId: number;
//   username: string;
//   timestamp: Date;
//   details?: string;
// }
export interface AuditLog {
  id: number;
  actionType: 'create' | 'update' | 'verify' | 'lock' | 'unlock' | 'delete'; // ✅ keep consistent verbs
  recordId: number;
  username: string;
  details: string;
  timestamp: Date;
}
