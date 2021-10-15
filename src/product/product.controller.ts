import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { Request, Response } from 'express';
import { RolesGuard } from '../authentication/gaurd/role.gaurd';
import { Roles } from '../authentication/gaurd/roles.decoder';
import { RoleTypes } from '../authentication/constants';
import { CreateProductDto } from './dto/create.product';

@Controller('api')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create-product')
  @UseGuards(RolesGuard)
  @Roles(RoleTypes.Administrator)
  async createProduct(@Body() product: CreateProductDto, @Res() res: Response) {
    return this.productService.create(product, res);
  }

  @Get('get-product')
  async getProduct(@Res() res: Response) {
    return await this.productService.findAll(res);
  }

  @Get('getOne-product/:id')
  async getOneProduct(@Param('id') id: string, @Res() res: Response) {
    return await this.productService.findOne(id, res);
  }

  @Patch('update-product/:id')
  @UseGuards(RolesGuard)
  @Roles(RoleTypes.Administrator)
  async updateProduct(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return await this.productService.update(id, req.body, res);
  }

  @Delete('delete-product/:id')
  @UseGuards(RolesGuard)
  @Roles(RoleTypes.Administrator)
  async deleteProduct(@Param('id') id: string, @Res() res: Response) {
    return await this.productService.delete(id, res);
  }
}
