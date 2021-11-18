import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from '../../schemas/admin_schema';
import { UserSchema } from '../../schemas/user.schema';
import { sendMailerService } from '../utils/sendMail';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }, { name: 'Admin', schema: AdminSchema },]),
  ],
  controllers: [UserController],
  providers: [UserService, sendMailerService],
})
export class UserModule {}
