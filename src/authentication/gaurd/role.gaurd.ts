import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminDocument } from '../../../schemas/admin_schema';
import { UserDocument } from '../../../schemas/user.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    @InjectModel('Admin') private readonly adminModel: Model<AdminDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const rolesExclude = this.reflector.get<string[]>(
      'rolesExclude',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    if (!request.headers) {
      throw new Error('Unauthorized');
    }

    let user: any = {};
    user = await this.userModel.findById(request.user._id);
    if (!user) {
      user = await this.adminModel.findById(request.user._id);
    }

    if (user) {
      if (roles && roles.includes(user.role)) {
        return true;
      } else if (rolesExclude && !rolesExclude.includes(user.role)) {
        return true;
      } else {
        throw new BadRequestException(
          'You have not valid permission to access this action!',
        );
      }
    }
  }
}
