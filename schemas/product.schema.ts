import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  category: string;

  @Prop()
  rating: number;

  @Prop()
  image: string;

  @Prop({ default: new Date })
  createAt: Date
}

export const ProductSchema = SchemaFactory.createForClass(Product);
