import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { PlactisController } from './plactis.controller';
import { PlactisService } from './plactis.service';
import { PlactisSchema } from './schemas/plactis.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Plactis', schema: PlactisSchema }]),
  ],
  controllers: [PlactisController],
  providers: [PlactisService],
})
export class plactisModule {}
