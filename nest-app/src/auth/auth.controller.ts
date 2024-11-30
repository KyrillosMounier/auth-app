import { Controller, Post, Body, UseGuards, Request, Get, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from '../dtos/signup.dto';
import { LocalAuthGuard } from '../local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signup(@Body((ValidationPipe)) signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }


}
