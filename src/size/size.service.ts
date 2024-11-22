import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Size } from './schemas/size.schema';

import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class SizeService {
  constructor(
    @InjectModel(Size.name)
    private sizeModel: mongoose.Model<Size>,
  ) {}

  async findAll(query: Query): Promise<Size[]> {
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

    const books = await this.sizeModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return books;
  }

  async create(size: Size, user: User): Promise<Size> {
    const data = Object.assign(size, { user: user._id });
    if (user.role !== 'admin')
      throw new UnauthorizedException('Just admin can access this endpoint');
    const res = await this.sizeModel.create(data);
    return res;
  }

  async findById(id: string): Promise<Size> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const book = await this.sizeModel.findById(id);

    if (!book) {
      throw new NotFoundException('Size not found.');
    }

    return book;
  }

  async updateById(id: string, size: Size, user: User): Promise<Size> {
    if (user.role !== 'admin')
      throw new UnauthorizedException('Just admin can access this endpoint');
    return await this.sizeModel.findByIdAndUpdate(id, size, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string, user: User): Promise<Size> {
    if (user.role !== 'admin')
      throw new UnauthorizedException('Just admin can access this endpoint');
    return await this.sizeModel.findByIdAndDelete(id);
  }
}
