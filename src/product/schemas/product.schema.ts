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
export class Product {
  @Prop({ unique: [true, 'Duplicate product name entered'] })
  name: string;

  @Prop()
  brand: string;

  @Prop({ type: Types.ObjectId, ref: 'Size', required: true })
  size_name: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Plactis',
    required: true,
  })
  plactis_name: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
