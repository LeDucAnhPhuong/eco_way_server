import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Category {
  ADVENTURE = 'Adventure',
  CALSSICS = 'Classics',
  CRIME = 'Crime',
  FANTASY = 'Fantasy',
}

@Schema({
  timestamps: true,
  _id: true,
})
export class Plactis {
  @Prop()
  name: string;

  @Prop()
  is_recyclable: number;
}

export const PlactisSchema = SchemaFactory.createForClass(Plactis);
