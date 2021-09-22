import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  profile: string;
  
  @Prop()
  description: string;

  @Prop()
  hobby: string;

  @Prop()
  password: string;

  @Prop({ default: 'User' })
  role: string

  @Prop({ default: new Date() })
  createAt: string
}

export const UserSchema = SchemaFactory.createForClass(User);
