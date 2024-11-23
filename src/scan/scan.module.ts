import QRCode from 'qrcode';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { ScanController } from './scan.controller';
import { ScanService } from './scan.service';
import { ScanSchema } from './schemas/scan.schema';
import { ProductSchema } from 'src/product/schemas/product.schema';
import { UserSchema } from 'src/auth/schemas/user.schema';
import { JWT } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Scan', schema: ScanSchema }]),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    HttpModule,
  ],
  controllers: [ScanController],
  providers: [
    ScanService,
    {
      provide: JWT,
      useFactory: () => {
        return new JWT({
          email: process.env.GOOGLE_CLIENT_EMAIL,
          key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Handle escaped newlines in private key
          scopes: ['https://www.googleapis.com/auth/cloud-platform'], // Add necessary scopes
        });
      },
      inject: [ConfigService],
    },
    {
      provide: 'ACCESS_TOKEN',
      useFactory: async (authClient: JWT) => {
        const token = await authClient.getAccessToken();
        return token.token; // Lấy giá trị token từ JWT
      },
      inject: [JWT],
    },
  ],
  exports: [JWT, 'ACCESS_TOKEN'],
})
export class ScanModule {}
