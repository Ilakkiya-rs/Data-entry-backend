// import { Module } from '@nestjs/common';
// import { ReviewService } from './review.service';
// import { ReviewController } from './review.controller';
// import { RecordsService } from 'src/record/record.service';
// import { AuditService } from '../audit/audit.service';

// @Module({
//   controllers: [ReviewController],
//   providers: [ReviewService, RecordsService, AuditService],
// })
// export class ReviewModule {}
import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { RecordsService } from 'src/record/record.service';
import { AuditService } from 'src/audit/audit.service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, RecordsService, AuditService],
})
export class ReviewModule {}

