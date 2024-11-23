import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ScanService } from './scan.service';
import { Scan } from './schemas/scan.schema';

import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';
@Controller('api/scan')
export class ScanController {
  constructor(private scanService: ScanService) {}

  @Get()
  async getAllSizes(@Query() query: ExpressQuery): Promise<Scan[]> {
    return this.scanService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createScan(@Body() base_64, @Req() req): Promise<Scan> {
    return this.scanService.create(base_64.image_b64, req.user);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async scanUser(
    @Param('id')
    id: string,
    @Req() req,
  ): Promise<Scan> {
    return this.scanService.updateById(id, req.user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteProduct(
    @Param('id')
    id: string,
  ): Promise<Scan> {
    return this.scanService.deleteById(id);
  }
}
