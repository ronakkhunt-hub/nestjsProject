import { IsNotEmpty, IsOptional } from 'class-validator';
import { Response } from 'express';

export class CreateProductDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsOptional()
  category: string;

  @IsOptional()
  rating: number;

  @IsNotEmpty()
  image: string;
}

export class UpdateProductDto {
  body(id: string, body: any, res: Response<any, Record<string, any>>) {
    throw new Error('Method not implemented.');
  }
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsOptional()
  category: string;

  @IsOptional()
  rating: number;

  @IsNotEmpty()
  image: string;
}