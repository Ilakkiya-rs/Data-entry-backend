import { Module, forwardRef } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { RecordsModule } from '../record/record.module';

@Module({
  imports: [forwardRef(() => RecordsModule)],
  controllers: [AssignmentController],
  providers: [AssignmentService],
})
export class AssignmentModule {}
