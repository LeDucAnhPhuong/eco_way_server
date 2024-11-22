import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { SizeController } from './size.controller';
import { SizeService } from './size.service';
import { SizeSchema } from './schemas/size.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Size', schema: SizeSchema }]),
  ],
  controllers: [SizeController],
  providers: [SizeService],
})
export class SizeModule {}
