// export class Record {
//   id: number;
//   propertyAddress: string;
//   transactionDate: Date;
//   borrowerName: string;
//   loanOfficerName: string;
//   nmlsId: number;
//   loanAmount: number;
//   salesPrice: number;
//   loanTerm: number;
//   apn: string;

//   enteredBy: string;
//   enteredByDate: Date;

//   reviewedBy?: string;
//   reviewedByDate?: Date;

//   status: 'pending' | 'approved' | 'rejected';
//   locked: boolean;
//     lockedBy?: string | null;  
//   lockedAt?: Date | null;
// }
export interface Record {
  id: number;
  propertyAddress: string;
  transactionDate: Date;
  borrowerName: string;
  loanOfficerName: string;
  nmlsId: number;
  loanAmount: number;
  salesPrice: number;
  loanTerm: number;
  apn: string;
  enteredBy: string;
  enteredByDate: Date;
  status: 'pending' | 'verified' | 'rejected' | 'approved';
  locked: boolean;
  lockedBy?: string |null;
  lockedAt?: Date |null;
  reviewedBy?: string;
  reviewedByDate?: Date;
  reviewNote?: string;
  batchId?: string;
  assignedTo?: string;
}

