import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ScanService } from './scan.service';
import { CreateScantDto } from './dto/create-scan.dto';
import { UpdateProductDto } from './dto/update-scan.dto';
import { Scan } from './schemas/scan.schema';

import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/scan')
export class ScanController {
  constructor(private scanService: ScanService) {}

  @Get()
  async getAllSizes(@Query() query: ExpressQuery): Promise<Scan[]> {
    return this.scanService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createScan(
    @Body()
    scan: CreateScantDto,
    @Req() req,
  ): Promise<Scan> {
    return this.scanService.create(scan, req.user);
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
