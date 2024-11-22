import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, SchemaTypes } from 'mongoose';

@Schema({
  timestamps: true,
  _id: true,
})
export class User extends Document {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  _id: Types.ObjectId;
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
