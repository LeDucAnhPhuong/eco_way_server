import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/user.schema';
import mongoose from 'mongoose';

export enum Category {
  ADVENTURE = 'Adventure',
  CALSSICS = 'Classics',
  CRIME = 'Crime',
  FANTASY = 'Fantasy',
}

@Schema({
  timestamps: true,
})
export class Size {
  @Prop({ unique: [true, 'Duplicate size name entered'] })
  name: string;

  @Prop()
  point: number;
}

export const SizeSchema = SchemaFactory.createForClass(Size);
