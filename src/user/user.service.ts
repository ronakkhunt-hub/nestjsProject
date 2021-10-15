import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Res,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';
import { User, UserDocument } from '../../schemas/user.schema';
import { LoginUserDto } from '../authentication/dto/login.user.dto';
import { RegisterUserDto, UpdateUserDto } from '../user/dto/create.user.dto';
import { join } from 'path';
import { match } from 'assert';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    private mailerService: MailerService,
  ) {}

  async createUser(data: RegisterUserDto, res: Response) {
    try {
      const emailValidate = await this.userModel.findOne({ email: data.email });
      if (emailValidate) {
        res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Email already exist',
        });
      } else {
        const registerUser = await this.userModel.create(data);
        if (registerUser) {
          res.status(HttpStatus.OK).json({
            message: 'User created successfully',
            data: registerUser,
          });
        }
      }
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async getOneUser(id: string, res: Response) {
    let getUser = await this.userModel.findById(id);
    return res.status(HttpStatus.OK).json({
      message: 'User get successfully',
      data: getUser,
    });
  }

  async getOne(data: LoginUserDto, res: Response) {
    let getUser = await this.userModel.findOne({
      email: data.email,
      password: data.password,
    });
    return res.status(HttpStatus.OK).json({
      message: 'User get successfully',
      data: getUser,
    });
  }

  async getUser(res: Response) {
    let getUser = await this.userModel.find({});
    return res.status(HttpStatus.OK).json({
      message: 'User get successfully',
      data: getUser,
    });
  }

  async updateUser(params: { id: string; data: UpdateUserDto }, res: Response) {
    const { id, data } = params;
    const userInfo = await this.userModel.findById(id);
    if (!userInfo) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const updateInfo = await this.userModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return res.status(200).json({
      message: 'User updated successfully',
      data: updateInfo,
    });
  }

  async deleteUser(id: string, res: Response) {
    const userInfo = await this.userModel.findById(id);
    if (!userInfo) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const deleteInfo = await this.userModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: 'User delete successfully',
      data: deleteInfo,
    });
  }

  async sendEmail(req: any, res: Response) {
    const { firstName, lastName, email, phoneNumber, description } = req;
    return await this.mailerService.sendMail({
      to: email,
      from: process.env.SMTP_EMAIL,
      template: join(__dirname, '../../../assets/template.hbs'),
      context: {
        firstName,
        lastName,
        email,
        phoneNumber,
        description,
      },
    });
  }

  async validateUser(id: string): Promise<User | boolean> {
    const user = await this.userModel.findById(id);
    if (user) {
      return user;
    } else {
      return false;
    }
  }
}
