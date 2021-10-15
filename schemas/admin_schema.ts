import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema()
export class Admin {
  _id: string;

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: 'Admin' })
  role: string

  @Prop({ default: new Date() })
  createAt: string
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
