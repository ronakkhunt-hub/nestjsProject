import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from '../product/product.controller';
import { ProductService } from '../product/product.service';
import { ProductSchema } from '../../schemas/product.schema';
import { UserService } from '../user/user.service';
import { UserSchema } from '../../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, UserService],
  exports: [UserService]
})
export class ProductModule {}
