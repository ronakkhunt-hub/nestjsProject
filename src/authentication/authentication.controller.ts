import { Controller, Post, Body, Res, Req, UseInterceptors, UploadedFile, Get } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { Response } from 'express';
import { Public } from './gaurd/public.decoder';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '../utils/upload.profile';
import { RegisterUserDto } from '../user/dto/create.user.dto';
import { LoginAdminDto, LoginUserDto } from './dto/login.user.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Public()
  @Post('register-user')
  @UseInterceptors(FileInterceptor('profile', storage))
  async create(@UploadedFile() file: any, @Body() user: RegisterUserDto, @Res() res: Response) {
    return await this.authenticationService.create(user, file, res);
  }

  @Public()
  @Post('login-user')
  async login(@Body() userLogin: LoginUserDto, @Res() res: Response) {
    return await this.authenticationService.login(userLogin, res);
  }

  @Public()
  @Post('login-admin')
  async loginAdmin(@Body() adminLogin: LoginAdminDto, @Res() res: Response) {
    return await this.authenticationService.loginAdmin(adminLogin, res);
  }
}
