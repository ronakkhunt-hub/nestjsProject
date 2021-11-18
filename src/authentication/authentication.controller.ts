import { Controller, Post, Body, Res, Req, UseInterceptors, UploadedFile, Get } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { Request, Response } from 'express';
import { Public } from './gaurd/public.decoder';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '../utils/upload.profile';

@Controller('auth')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Public()
  @Post('register-user')
  @UseInterceptors(FileInterceptor('profile', storage))
  async create(@UploadedFile() file: any, @Req() req: any, @Res() res: Response) {
    return await this.authenticationService.create(req.body, file, res);
  }

  @Public()
  @Post('login-user')
  async login(@Req() req: any, @Res() res: Response) {
    return await this.authenticationService.login(req.body, res);
  }

  @Public()
  @Post('login-admin')
  async loginAdmin(@Req() req: any, @Res() res: Response) {
    return await this.authenticationService.loginAdmin(req.body, res);
  }
}
