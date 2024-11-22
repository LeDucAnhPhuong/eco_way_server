import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Scan } from 'src/scan/schemas/scan.schema';
import { Product } from 'src/product/schemas/product.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(Scan.name)
    private scanModel: Model<Scan>,
    @InjectModel(Product.name)
    private productModel: Model<Product>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      role: 'user',
    });

    const token = this.jwtService.sign({ id: user._id, role: user.role });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string; message: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.jwtService.sign({ id: user._id, role: user.role });

    return { token: token, message: 'login success' };
  }
  async isAuth(user: User) {
    const { name, email } = user;
    return { user: { name, email }, message: 'login success' };
  }

  async getProfile(user: User) {
    const scan = await this.scanModel.find({ id_user: user._id });
    const historyScan = await Promise.all(
      scan.map(async (item) => {
        const product = await this.productModel.findById(item.id_product);
        return {
          id_scan: item._id,
          product: product,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      }),
    );
    const data = {
      user_name: user.name,
      user_email: user.email,
      historyScan,
    };
    return data;
  }
}
