import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { RoleTypes } from '../authentication/constants';
import { RolesGuard } from '../authentication/gaurd/role.gaurd';
import { Roles } from '../authentication/gaurd/roles.decoder';
import { UserService } from './user.service';
import { Public } from '../authentication/gaurd/public.decoder';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-user')
  async registerUser(
    @Req() req: any,
    @Res() res: Response,
  ) {
    return this.userService.createUser(req.body, res);
  }

  @Get('getOne-user/:id')
  async getOneUser(@Param('id') id: string, @Res() res: Response) {
    return this.userService.getOneUser(id, res);
  }

  @Public()
  @Post('getUser')
  async getOne(@Req() req: any, @Res() res: Response) {
    return this.userService.getOne(req.body, res);
  }

  @Get('get-user')
  async getUser(@Res() res: Response) {
    return this.userService.getUser(res);
  }

  @UseGuards(RolesGuard)
  @Roles(RoleTypes.Administrator)
  @Patch('update-user/:id')
  async updateUser(
    @Param('id') id: string,
    @Req() req: any,
    @Res() res: Response,
  ) {
    return this.userService.updateUser({ id, data: req.body }, res);
  }

  @UseGuards(RolesGuard)
  @Roles(RoleTypes.Administrator)
  @Delete('delete-user/:id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    return this.userService.deleteUser( id, res );
  }

  @Public()
  @Post('sendEmail')
  async sendEmail(@Req() req: any, @Res() res: Response){
    return this.userService.sendEmail(req.body, res)
  }
}
