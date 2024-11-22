import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { plactisModule } from './plactis/plactis.module';
import { AuthModule } from './auth/auth.module';
import { SizeModule } from './size/size.module';
import { ProductModule } from './product/product.module';
import { ScanModule } from './scan/scan.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    plactisModule,
    AuthModule,
    SizeModule,
    ProductModule,
    ScanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
