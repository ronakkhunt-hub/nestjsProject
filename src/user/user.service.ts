import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt' 
import { Response } from 'express';
import { Model } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';
import { User, UserDocument } from '../../schemas/user.schema';
import { LoginUserDto } from '../authentication/dto/login.user.dto';
import { RegisterUserDto, UpdateUserDto } from '../user/dto/create.user.dto';
import * as path from 'path';
import vidoeStitch from 'video-stitch';
import ffmpeg_static from 'ffmpeg-static';
import { Admin, AdminDocument } from '../../schemas/admin_schema';
import { generateRandomPassword } from '../utils/constants';
import { sendMailerService } from '../utils/sendMail';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    @InjectModel('Admin') private readonly adminModel: Model<AdminDocument>,
    private mailService: sendMailerService,
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
        const password = generateRandomPassword();
        const hashedPassword = await bcrypt.hash(password, 12)
        data.password = hashedPassword; 
        const registerUser = await this.userModel.create(data);
        await this.mailService.sendMailForStudent(data.email, { loginId: Date.now(), password: password })
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

  async videoMerge(req: any, file: any[], res: Response) {
    if (file.length > 0) {
      let merger = vidoeStitch.merge;
      for (let i = 0; i < file.length; i++) {
        merger({
          ffmpeg_path: ffmpeg_static,
        })
          .original({
            duration: 30000,
            startTime: 0,
            fileName: path.join(__dirname, 'assets', 'videoplayback-3e110.mp4'),
          })
          .clips([
            {
              startTime: 5000,
              duration: 5000,
              fileName: path.join(__dirname, 'assets', 'tailor-5-10.mp4'),
            },
            {
              startTime: 20000,
              duration: 5000,
              fileName: path.join(__dirname, 'assets', 'tailor-20-25.mp4'),
            },
          ])
          .merge()
          .then((finalOutput) => {
            console.log('finalOutput: ', finalOutput);
          })
          .catch((err) => {
            console.log(`err`, err);
          });
          break;
      }
    }
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
      template: path.join(__dirname, '../../../assets/template.hbs'),
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

  async validateUserAd(id: string): Promise<Admin | boolean> {
    const user = await this.adminModel.findById(id);
    if (user) {
      return user;
    } else {
      return false;
    }
  }
}
