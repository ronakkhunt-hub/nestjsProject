import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from '../product/product.controller';
import { ProductService } from '../product/product.service';
import { ProductSchema } from '../../schemas/product.schema';
import { UserService } from '../user/user.service';
import { UserSchema } from '../../schemas/user.schema';
import { AdminSchema } from '../../schemas/admin_schema';
import { sendMailerService } from '../utils/sendMail';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Admin', schema: AdminSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, UserService, sendMailerService],
  exports: [UserService]
})
export class ProductModule {}
