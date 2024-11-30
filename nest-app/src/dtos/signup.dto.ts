import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class SignupDto {
  @IsString({ message: 'Full name is required and must be a string.' })
  @MinLength(3, { message: 'Full name must be at least 3 characters long.' })
  fullName: string;

  @IsEmail({}, { message: 'A valid email address is required.' })
  email: string;

  @IsString({ message: 'Password is required and must be a string.' })
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter.' })
  @Matches(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter.' })
  @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number.' })
  @Matches(/(?=.*[@$!%*?&])/,
    { message: 'Password must contain at least one special character (e.g., @$!%*?&).' })
  password: string;
}
