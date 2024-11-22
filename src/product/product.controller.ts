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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/product.schema';

import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getAllSizes(@Query() query: ExpressQuery): Promise<Product[]> {
    return this.productService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createProduct(
    @Body()
    product: CreateProductDto,
    @Req() req,
  ): Promise<Product> {
    return this.productService.create(product, req.user);
  }

  @Get(':id')
  async getProduct(
    @Param('id')
    id: string,
  ): Promise<Product> {
    return this.productService.findById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async updateProduct(
    @Param('id')
    id: string,
    @Body()
    product: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateById(id, product);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteProduct(
    @Param('id')
    id: string,
  ): Promise<Product> {
    return this.productService.deleteById(id);
  }
}
