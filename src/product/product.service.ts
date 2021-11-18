import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response } from 'express';
import { CreateProductDto } from './dto/create.product';
import { ProductDocument } from '../../schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private productModel: Model<ProductDocument>,
  ) {}
  async create(req: CreateProductDto, res: Response) {
    const createProduct = await this.productModel.create(req);
    if (createProduct) {
      return res.status(HttpStatus.OK).json({
        message: 'Product create successfully',
        data: createProduct,
      });
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Product not found',
      });
    }   
  }

  async findAll(res: Response) {
    const getProduct = await this.productModel.find().exec();
    if (getProduct.length) {
      res.status(HttpStatus.OK).json({
        message: 'Product get successfully',
        data: getProduct
      });
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Product not found',
      });
    }
  }

  async findOne(id: string, res: Response) {
    const getOneProduct = await this.productModel.findById(id).exec();
    if (getOneProduct) {
      res.status(HttpStatus.OK).json({
        message: 'Product get successfully',
        data: getOneProduct,
      });
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Product not found',
      });
    }
  }

  async update(id: string, req: CreateProductDto, res: Response) {
    const updateProduct = await this.productModel.findByIdAndUpdate(id, req, {
      new: true,
    });
    if (updateProduct) {
      res.status(HttpStatus.OK).status(HttpStatus.OK).json({
        message: 'Product update successfully',
        data: updateProduct,
      });
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Product not found',
      });
    }
  }

  async delete(id: string, res: Response) {
    const deleteProduct = await this.productModel.findByIdAndDelete(id);
    if (deleteProduct) {
      res.status(HttpStatus.OK).json({
        message: 'Product delete successfully',
        data: deleteProduct,
      });
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Product not found',
      });
    }
  }
}
