import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model } from 'mongoose';
import { AdminDocument } from '../../schemas/admin_schema';
import { UserDocument } from '../../schemas/user.schema';
import { RegisterUserDto } from '../user/dto/create.user.dto';
import { JwtPayload } from './dto/jwt.dto';
import { LoginUserDto } from './dto/login.user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    @InjectModel('Admin') private readonly adminModel: Model<AdminDocument>,
  ) {}

  async create(user: RegisterUserDto, file: any, res: Response) {
    const emailValidate = await this.userModel.findOne({ email: user.email });
    if (emailValidate) {
      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Email already exist',
      });
    } else {
      const securePassword = await bcrypt.hash(user.password, 12);
      user.password = securePassword;
      user.profile = file.filename;
      const registerUser = await this.userModel.create(user);
      if (registerUser) {
        res.status(HttpStatus.OK).json({
          message: 'Registration successfully',
          data: registerUser,
        });
      }
    }
  }

  async login(user: LoginUserDto, res: Response) {
    const loginUser = await this.userModel.findOne({ email: user.email });
    if (loginUser) {
      const valid = await bcrypt.compare(user.password, loginUser.password);
      if (valid) {
        const payload: JwtPayload = loginUser.id;
        const token: string = this.jwtService.sign({ id: payload });
        res.status(HttpStatus.OK).json({
          message: 'Login successfully',
          data: loginUser,
          token: token,
        });
      }else{
        res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Invalid login credentials',
        });
      }
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Invalid login credentials',
      });
    }
  }

  async loginAdmin(user: any, res: Response) {
    const loginUser = await this.adminModel.findOne({
      email: user.email,
      password: user.password,
    });
    if (loginUser) {
      const payload: JwtPayload = loginUser.id;
      const token: string = this.jwtService.sign({ id: payload });
      res.status(HttpStatus.OK).json({
        message: 'Login successfully',
        data: loginUser,
        token: token,
      });
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Invalid login credentials',
      });
    }
  }
}
