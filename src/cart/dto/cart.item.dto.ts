import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCartItemsDto {
  _id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  quantity: number;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  image: string;
}

export class UpdateCartItemsDto {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  price: number;

  @IsOptional()
  quantity: number;

  @IsOptional()
  image: string;
}
