import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Scan } from './schemas/scan.schema';

import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';
import { CreateScantDto } from './dto/create-scan.dto';
import { Product } from 'src/product/schemas/product.schema';
import * as QRCode from 'qrcode';
import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class ScanService {
  constructor(
    @InjectModel(Scan.name)
    private ScanModel: mongoose.Model<Scan>,
    @InjectModel(Product.name)
    private ProductModel: mongoose.Model<Product>,
    @InjectModel(User.name)
    private UserModel: mongoose.Model<User>,
  ) {
    cloudinary.config({
      cloud_name: 'dumecudpk',
      api_key: '586263643843161',
      api_secret: process.env.CLOULDINARY_API_KEY,
    });
  }

  async uploadImage(base64: string): Promise<string> {
    const buffer = Buffer.from(
      base64.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'uploads' }, (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        })
        .end(buffer);
    });
  }
  async generateQRCode(url: mongoose.Types.ObjectId) {
    const image = await QRCode.toDataURL(String(url));
    const src = this.uploadImage(image);
    return src;
  }

  async findAll(query: Query): Promise<Scan[]> {
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

    const books = await this.ScanModel.find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return books;
  }
  async create(scan: CreateScantDto, user: User): Promise<Scan> {
    if (user.role !== 'admin')
      throw new UnauthorizedException('Just admin can access this endpoint');
    if (!scan.success) throw new NotFoundException('Not find product');
    const product = await this.ProductModel.findOne({
      name: scan.detected_label,
    });
    try {
      const id_qr = new mongoose.Types.ObjectId();
      const qr_url = await this.generateQRCode(id_qr);
      const data = Object.assign(
        {
          id_product: product._id,
          id_user: null,
          _id: id_qr,
          active: true,
          qr_url,
        },
        { user: user._id },
      );
      const res = await this.ScanModel.create(data);
      return res;
    } catch (err) {
      console.error(err);
    }
  }

  async findById(id: string): Promise<Scan> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const book = await this.ScanModel.findById(id);

    if (!book) {
      throw new NotFoundException('Size not found.');
    }

    return book;
  }

  async updateById(id_qr: string, user: User): Promise<Scan> {
    const isActiveQR = await this.ScanModel.findById(id_qr);
    if (!isActiveQR.active) throw new NotFoundException('qr code unavaible');

    return await this.ScanModel.findByIdAndUpdate(
      id_qr,
      {
        active: false,
        id_user: user._id,
      },
      {
        new: true,
        runValidators: true,
      },
    );
  }

  async deleteById(id: string): Promise<Scan> {
    return await this.ScanModel.findByIdAndDelete(id);
  }
}
