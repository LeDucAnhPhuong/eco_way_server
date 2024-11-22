import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Plactis } from './schemas/plactis.schema';

import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class PlactisService {
  constructor(
    @InjectModel(Plactis.name)
    private plactisModel: mongoose.Model<Plactis>,
  ) {}

  async findAll(query: Query): Promise<Plactis[]> {
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

    const books = await this.plactisModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return books;
  }

  async create(book: Plactis, user: User): Promise<Plactis> {
    const data = Object.assign(book, { user: user._id });

    const res = await this.plactisModel.create(data);
    return res;
  }

  async findById(id: string): Promise<Plactis> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const book = await this.plactisModel.findById(id);

    if (!book) {
      throw new NotFoundException('Book not found.');
    }

    return book;
  }

  async updateById(id: string, book: Plactis): Promise<Plactis> {
    return await this.plactisModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Plactis> {
    return await this.plactisModel.findByIdAndDelete(id);
  }
}
