import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductSchema } from './schemas/product.schema';
import { SizeSchema } from 'src/size/schemas/size.schema';
import { PlactisSchema } from 'src/plactis/schemas/plactis.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: 'Size', schema: SizeSchema }]),
    MongooseModule.forFeature([{ name: 'Plactis', schema: PlactisSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
