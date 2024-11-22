import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Product } from './schemas/product.schema';

import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';
import { Size } from 'src/size/schemas/size.schema';
import { Plactis } from 'src/plactis/schemas/plactis.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private ProductModel: mongoose.Model<Product>,
    @InjectModel(Size.name)
    private SizeModel: mongoose.Model<Size>,
    @InjectModel(Plactis.name)
    private PlactisModel: mongoose.Model<Plactis>,
  ) {}

  async findAll(query: Query): Promise<Product[]> {
    const resPerPage = Number(query.limit) || 10;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const books = await this.ProductModel.find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return books;
  }

  async create(product: Product, user: User): Promise<Product> {
    const data = Object.assign(product, { user: user._id });
    const isExistSize = await this.SizeModel.exists({ name: data.size_name });
    const isExistPlactis = await this.PlactisModel.exists({
      name: data.plactis_name,
    });
    if (!isExistSize) throw new NotFoundException('size not exist');
    if (!isExistPlactis) throw new NotFoundException('plactis not exist');
    const res = await this.ProductModel.create(data);
    return res;
  }

  async findById(id: string): Promise<Product> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const book = await this.ProductModel.findById(id);

    if (!book) {
      throw new NotFoundException('Size not found.');
    }

    return book;
  }

  async updateById(id: string, size: Product): Promise<Product> {
    return await this.ProductModel.findByIdAndUpdate(id, size, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Product> {
    return await this.ProductModel.findByIdAndDelete(id);
  }
}
