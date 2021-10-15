import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from '../../schemas/admin_schema';
import { UserSchema } from '../../schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }, { name: 'Admin', schema: AdminSchema },]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
