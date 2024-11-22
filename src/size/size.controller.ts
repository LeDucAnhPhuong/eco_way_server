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
import { SizeService } from './size.service';
import { CreateSizeDto } from './dto/create-book.dto';
import { UpdateSizeDto } from './dto/update-book.dto';
import { Size } from './schemas/size.schema';

import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/size')
export class SizeController {
  constructor(private sizeService: SizeService) {}

  @Get()
  async getAllSizes(@Query() query: ExpressQuery): Promise<Size[]> {
    return this.sizeService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createSize(
    @Body()
    size: CreateSizeDto,
    @Req() req,
  ): Promise<Size> {
    return this.sizeService.create(size, req.user);
  }

  @Get(':id')
  async getSize(
    @Param('id')
    id: string,
  ): Promise<Size> {
    return this.sizeService.findById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async updateSize(
    @Param('id')
    id: string,
    @Body()
    size: UpdateSizeDto,
    @Req() req,
  ): Promise<Size> {
    return this.sizeService.updateById(id, size, req.user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteSize(
    @Param('id')
    id: string,
    @Req() req,
  ): Promise<Size> {
    return this.sizeService.deleteById(id, req.user);
  }
}
