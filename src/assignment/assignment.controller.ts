import { Controller, Post, Body } from '@nestjs/common';
import { AssignmentService } from './assignment.service';

@Controller('assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Post('/assign')
  assign(@Body() body: { ids: number[]; username: string }) {
    return {
      assigned: this.assignmentService.assignRecords(body.ids, body.username),
    };
  }

  @Post('/unassign')
  unassign(@Body() body: { ids: number[] }) {
    return {
      unassigned: this.assignmentService.unassignRecords(body.ids),
    };
  }
}
