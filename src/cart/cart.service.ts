import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model } from 'mongoose';
import { Cart } from '../../schemas/cart_schema';
import { CreateCartItemsDto, UpdateCartItemsDto } from './dto/cart.item.dto';

@Injectable()
export class CartService {
  constructor(@InjectModel('Cart') private cartModel: Model<Cart>) {}

  async createCart(cartData: CreateCartItemsDto, res: Response) {
    delete cartData._id;
    // const validateCart = await this.cartModel.find({ title: cartData.title });
    // console.log(`validateCart`, validateCart)
    const cartItem = await this.cartModel.create(cartData);
    return res.status(201).json({
      message: 'Cart added successfully',
      data: cartItem,
    });
  }

  async getCart(res: Response) {
    const cartData = await this.cartModel.find();
    return res.status(200).json({
      data: cartData,
      message: 'Cart data get successfully',
    });
  }

  async getOneCart(id: string, res: Response) {
    const cartData = await this.cartModel.findById(id);
    console.log(`cartData`, cartData);
    return res.status(200).json({
      data: cartData,
      message: 'Cart data get successfully',
    });
  }

  async updateCart(id: string, cartData: UpdateCartItemsDto, res: Response) {
    const findCart = await this.cartModel.findById(id);
    if (!findCart) {
      res.status(400).json({
        message: 'Cart is not fount',
      });
    }
    const updateData = await this.cartModel.findByIdAndUpdate(id, cartData);
    res.status(200).json({
      data: updateData,
      message: 'Cart updated successfully.',
    });
  }

  async deleteCart(id: string, res: Response) {
    const findCart = await this.cartModel.findById(id);
    if (!findCart) {
      res.status(400).json({
        message: 'Cart is not fount',
      });
    }
    const updateData = await this.cartModel.findByIdAndDelete(id);
    if (updateData) {
      res.status(200).json({
        data: updateData,
        message: 'Cart deleted successfully.',
      });
    }
  }
}

