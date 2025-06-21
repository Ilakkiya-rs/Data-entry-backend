import { Controller, Post, Get, Param, Delete, Body } from '@nestjs/common';
import { BatchService } from './batch.service';
import { Batch } from './batch.entity';

@Controller('batches')
export class BatchController {
  constructor(private readonly batchService: BatchService) {}

  @Post()
  create(@Body() body: { id: string; name: string }): Batch {
    return this.batchService.create(body.id, body.name);
  }

  @Get()
  findAll(): Batch[] {
    return this.batchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Batch {
    return this.batchService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.batchService.remove(id);
  }
}
