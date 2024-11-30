import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import config from '../config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt_secret_key, // Load secret from config,
    });
  }

  async validate(payload: any) {
    // Validate token and extract user information
    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
