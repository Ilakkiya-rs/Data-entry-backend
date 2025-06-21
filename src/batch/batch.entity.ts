//     export class Batch {
//   id: number;
//   name: string;
//   type: 'daily' | 'weekly';
//   startDate: Date;
//   endDate: Date;
//   recordIds: number[];
//   assignedTo: string; // username of VA
// }
// src/batch/batch.entity.ts
export class Batch {
  id: string; // e.g., '2025-06-batch1'
  name: string;
  createdAt: Date;
}


