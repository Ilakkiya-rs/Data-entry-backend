// import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
// import { RecordsService } from './record.service';
// import { Record } from './record.entity';
// import { Query } from '@nestjs/common';
// @Controller('records')
// export class RecordsController {
//   constructor(private readonly recordsService: RecordsService) {}

//   @Post()
//   create(@Body() data: Partial<Record>): Record {
//     return this.recordsService.create(data);
//   }

//   @Get()
//   findAll(): Record[] {
//     return this.recordsService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string): Record {
//     return this.recordsService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() data: Partial<Record>): Record {
//     return this.recordsService.update(+id, data);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string): { deleted: boolean } {
//     return this.recordsService.remove(+id);
//   }
//   @Post(':id/lock')
// lock(@Param('id') id: string, @Body('username') username: string) {
//   return this.recordsService.lockRecord(+id, username);
// }

// @Post(':id/unlock')
// unlock(@Param('id') id: string, @Body('username') username: string) {
//   return this.recordsService.unlockRecord(+id, username);
// }
// @Get('/assigned')
// getAssignedRecords(
//   @Query('username') username: string,
//   @Query('page') page = '1',
//   @Query('limit') limit = '10',
//   @Query('batchId') batchId?: string,
// ) {
//   return this.recordsService.findPaginated(
//     username,
//     parseInt(page),
//     parseInt(limit),
//     batchId,
//   );
// }
// }
import { Controller, Post, Get, Patch, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { RecordsService } from './record.service';
import { Record } from './record.entity';



@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  create(@Body() data: Partial<Record>): Record {
    return this.recordsService.create(data);
  }

  // ✅ Search route (must come before :id)
  @Get('/search')
  search(
    @Query('query') query: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10'
  ) {
    return this.recordsService.searchRecords(query, parseInt(page), parseInt(limit));
  }

  // ✅ Get assigned records (must also be above :id)
  @Get('/assigned')
  getAssignedRecords(
    @Query('username') username: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('batchId') batchId?: string,
  ) {
    return this.recordsService.findPaginated(
      username,
      parseInt(page),
      parseInt(limit),
      batchId,
    );
  }

  // ✅ Get all records
  @Get()
async findAll(): Promise<Record[]> {
  const records = await this.recordsService.findAll();
  console.log('Records found:', records.length);
  return records;  // <-- this fixes the error
}


  // ✅ Update a record
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<Record>): Record {
    return this.recordsService.update(+id, data);
  }

  // ✅ Delete a record
  @Delete(':id')
  remove(@Param('id') id: string): { deleted: boolean } {
    return this.recordsService.remove(+id);
  }

  // ✅ Lock a record
  @Post(':id/lock')
  lock(@Param('id') id: string, @Body('username') username: string) {
    return this.recordsService.lockRecord(+id, username);
  }

  // ✅ Unlock a record
  @Post(':id/unlock')
  unlock(@Param('id') id: string, @Body('username') username: string) {
    return this.recordsService.unlockRecord(+id, username);
  }

  // ✅ Get record by ID (must be last)
  @Get(':id')
  findOne(@Param('id') id: string): Record {
    return this.recordsService.findOne(+id);
  }
}
