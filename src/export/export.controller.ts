import { Controller, Get, Query, Res } from '@nestjs/common';
import { ExportService } from './export.service';
import { Response } from 'express';

@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get('status')
  async exportByStatus(@Query('status') status: string, @Res() res: Response) {
    try {
      const csv = await this.exportService.exportToCSVByStatus(status);
      res.header('Content-Type', 'text/csv');
      res.attachment(`records-${status}.csv`);
      res.send(csv);
    } catch (error) {
      console.error('Export by status error:', error);
      res.status(500).send({ message: 'Export failed' });
    }
  }

  @Get('reviewer')
  async exportByReviewer(@Query('reviewer') reviewer: string, @Res() res: Response) {
    try {
      const csv = await this.exportService.exportToCSVByReviewer(reviewer);
      res.header('Content-Type', 'text/csv');
      res.attachment(`records-by-${reviewer}.csv`);
      res.send(csv);
    } catch (error) {
      console.error('Export by reviewer error:', error);
      res.status(500).send({ message: 'Export failed' });
    }
  }

  @Get('all')
  async exportAll(@Res() res: Response) {
    try {
      const csv = await this.exportService.exportAll();
      res.header('Content-Type', 'text/csv');
      res.attachment('all-records.csv');
      res.send(csv);
    } catch (error) {
      console.error('Export all error:', error);
      res.status(500).send({ message: 'Export failed' });
    }
  }
}

