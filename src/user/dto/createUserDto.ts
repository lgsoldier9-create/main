import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRole } from '../user-role.enum';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDate()
  birthdate?: Date;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  googleId?: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  avatarUrl: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
