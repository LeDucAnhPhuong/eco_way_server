import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
export enum Category {
  ADVENTURE = 'Adventure',
  CALSSICS = 'Classics',
  CRIME = 'Crime',
  FANTASY = 'Fantasy',
}

@Schema({
  timestamps: true,
})
export class Scan {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  id_product: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  id_user: Types.ObjectId | null;

  @Prop()
  qr_url: string;

  @Prop()
  id_qr: string;

  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;

  @Prop()
  image_url: string;

  @Prop()
  label: string;
  @Prop()
  isSuccess: boolean;

  @Prop({ required: true })
  active: boolean;
}

export const ScanSchema = SchemaFactory.createForClass(Scan);
