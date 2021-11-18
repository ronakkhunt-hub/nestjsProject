import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CartService } from './cart.service';
import { CreateCartItemsDto, UpdateCartItemsDto } from './dto/cart.item.dto';

@Controller('api')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post('addToCart')
  async createCart(@Body() cartData: CreateCartItemsDto, @Res() res: Response) {
    return await this.cartService.createCart(cartData, res);
  }

  @Get('get-cart')
  async getCart(@Res() res: Response) {
    return await this.cartService.getCart(res);
  }

  @Get('get-cart/:id')
  async getOneCart(@Param('id') id: string, @Res() res: Response) {
    return await this.cartService.getOneCart(id, res);
  }

  @Patch('update-cart/:id')
  async updateCart(
    @Param('id') id: string,
    @Body() cartData: UpdateCartItemsDto,
    @Res() res: Response,
  ) {
    return await this.cartService.updateCart(id, cartData, res);
  }

  @Delete('delete-cart/:id')
  async removeCart(@Param('id') id: string, @Res() res: Response) {
    return await this.cartService.deleteCart(id, res);
  }
}
