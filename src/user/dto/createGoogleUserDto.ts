import { IsEmail, IsString } from 'class-validator';

export class CreateGoogleUserDto {
  @IsEmail()
  email: string;
  @IsString()
  googleId: string;
  @IsString()
  firstName?: string;
  @IsString()
  lastName?: string;
  @IsString()
  avatarUrl?: string;
}
