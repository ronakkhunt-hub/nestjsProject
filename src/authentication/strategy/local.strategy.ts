import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserService } from '../../user/user.service';
import { JwtPayload } from '../dto/jwt.dto';
import { jwtConstants } from '../../utils/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload) {
    let user = {};
    user = await this.userService.validateUser(payload.id);
    if (!user) {
      user = await this.userService.validateUserAd(payload.id);
    }
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
