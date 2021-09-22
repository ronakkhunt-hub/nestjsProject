import { IsNotEmpty, IsOptional } from 'class-validator';

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

  @IsOptional()
  image: string;
}
