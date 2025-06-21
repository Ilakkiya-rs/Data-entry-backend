import { Controller, Post, Patch, Get, Body, Param } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Record } from 'src/record/record.entity';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  review(
    @Body('id') id: number,
    @Body('reviewer') reviewer: string,
    @Body('status') status: 'approved' | 'rejected' | 'pending' | 'verified',
    @Body('note') note?: string,
  ): Record {
    return this.reviewService.reviewRecord(id, reviewer, status, note);
  }

  @Patch(':id')
  updateReview(
    @Param('id') id: string,
    @Body('reviewer') reviewer: string,
    @Body('status') status: 'approved' | 'rejected' | 'pending' | 'verified',
    @Body('note') note?: string,
  ): Record {
    return this.reviewService.reviewRecord(+id, reviewer, status, note);
  }

  @Get('pending')
  getPending(): Record[] {
    return this.reviewService.getPendingRecords();
  }
}
