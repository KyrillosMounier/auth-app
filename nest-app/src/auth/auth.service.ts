import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { SignupDto } from '../dtos/signup.dto';
import { LoginDto } from '../dtos/login.dto';
import config from '../config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return { id: user._id, email: user.email }; // Exclude sensitive data
    }
    return false
  }

  async login(user: LoginDto) {
    const payload = { email: user.email, sub: user.id };
    console.log(payload)
    return { access_token: this.jwtService.sign(payload,{expiresIn:config.jwt_expiry_minutes + 'm'}) };
  }

  async signup(data:SignupDto) {
    // Check if the email already exists in the database
    const existingUser = await this.userService.findByEmail(data.email);

    if (existingUser) {
      // If a user with this email exists, throw a ConflictException (HTTP 409)
      throw new ConflictException('Email already in use');
    }

    // If no user is found, hash the password and create a new user
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    return this.userService.createUser(data);
  }
  //TODO: Here is forget password fllow to use
  // forget password and reset password fllow

    /*1- User submits their email to request a password reset.
    2-Backend generates a password reset token (JWT) with a short expiration (e.g., 15 minutes).
    3-Token is emailed to the user via a reset link (e.g., https://your-frontend-url/reset-password?token=xxx).
    4-User submits the new password with the token to reset their password.
    */

    async sendPasswordResetToken(email: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
          throw new BadRequestException('No user found with this email.');
        }
    
        const resetToken = this.jwtService.sign(
          { sub: user._id },
          { expiresIn: '15m' } // Token expires in 15 minutes
        );

        // Normally, you would send this token via email.
        // Use Node Mailer to send it
        console.log(`Reset Link: https://your-frontend-url/reset-password?token=${resetToken}`);
      }
    
      async resetPassword(token: string, newPassword: string) {
        try {
          const payload = this.jwtService.verify(token);
          const user = await this.userService.findById(payload.sub);
          if (!user) {
            throw new UnauthorizedException('Invalid or expired token.');
          }
    
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          user.password = hashedPassword;
          await user.save();
        } catch (error) {
          throw new BadRequestException('Invalid or expired token.');
        }
      }
    //TODO: swagger docs
    //TODO: api integration testing
}
