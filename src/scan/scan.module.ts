import QRCode from 'qrcode';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { ScanController } from './scan.controller';
import { ScanService } from './scan.service';
import { ScanSchema } from './schemas/scan.schema';
import { ProductSchema } from 'src/product/schemas/product.schema';
import { UserSchema } from 'src/auth/schemas/user.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Scan', schema: ScanSchema }]),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [ScanController],
  providers: [ScanService],
})
export class ScanModule {}
