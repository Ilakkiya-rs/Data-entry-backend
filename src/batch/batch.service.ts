// import { Injectable, NotFoundException } from '@nestjs/common';
// import { Batch } from './batch.entity';

// @Injectable()
// export class BatchService {
//   private batches: Batch[] = [];

//   create(batch: Batch): Batch {
//     this.batches.push(batch);
//     return batch;
//   }

//   findAll(): Batch[] {
//     return this.batches;
//   }

//   findById(id: string): Batch {
//     const batch = this.batches.find(b => b.id === id);
//     if (!batch) throw new NotFoundException(`Batch with ID ${id} not found`);
//     return batch;
//   }

//   remove(id: string): { deleted: boolean } {
//     const before = this.batches.length;
//     this.batches = this.batches.filter(b => b.id !== id);
//     return { deleted: this.batches.length < before };
//   }
// }
import { Injectable, NotFoundException } from '@nestjs/common';
import { Batch } from './batch.entity';

@Injectable()
export class BatchService {
  private batches: Batch[] = [];

  create(id: string, name: string): Batch {
    const newBatch: Batch = {
      id,
      name,
      createdAt: new Date(),
    };
    this.batches.push(newBatch);
    return newBatch;
  }

  findAll(): Batch[] {
    return this.batches;
  }

  findOne(id: string): Batch {
    const batch = this.batches.find(b => b.id === id);
    if (!batch) throw new NotFoundException(`Batch ${id} not found`);
    return batch;
  }

  remove(id: string): { deleted: boolean } {
    const prevLen = this.batches.length;
    this.batches = this.batches.filter(b => b.id !== id);
    return { deleted: this.batches.length < prevLen };
  }
}
