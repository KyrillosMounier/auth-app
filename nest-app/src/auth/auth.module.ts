import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import config from '../config';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: config.jwt_secret_key,
      signOptions: { expiresIn: config.jwt_expiry_minutes + 'm' }, // Token expiration time
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
