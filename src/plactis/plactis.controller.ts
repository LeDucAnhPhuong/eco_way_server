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
import { PlactisService } from './plactis.service';
import { CreatePlactisDto } from './dto/create-plactis.dto';
import { UpdatePlactisDto } from './dto/update-plactis.dto';
import { Plactis } from './schemas/plactis.schema';

import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/plactis')
export class PlactisController {
  constructor(private plactisService: PlactisService) {}

  @Get()
  async getAllPlactis(@Query() query: ExpressQuery): Promise<Plactis[]> {
    return this.plactisService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createPlactis(
    @Body()
    plactis: CreatePlactisDto,
    @Req() req,
  ): Promise<Plactis> {
    return this.plactisService.create(plactis, req.user);
  }

  @Get(':id')
  async getPlactis(
    @Param('id')
    id: string,
  ): Promise<Plactis> {
    return this.plactisService.findById(id);
  }

  @Put(':id')
  async updatePlactis(
    @Param('id')
    id: string,
    @Body()
    plactis: UpdatePlactisDto,
  ): Promise<Plactis> {
    return this.plactisService.updateById(id, plactis);
  }

  @Delete(':id')
  async deletePlactis(
    @Param('id')
    id: string,
  ): Promise<Plactis> {
    return this.plactisService.deleteById(id);
  }
}
