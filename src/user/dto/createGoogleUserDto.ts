import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateGoogleUserDto {
  @ApiProperty({ description: 'Email of the user', example: 'user@example.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ description: 'Google ID of the user', example: '1234567890' })
  @IsString()
  googleId: string;
  @ApiProperty({ description: 'First name of the user', example: 'John' })
  @IsString()
  firstName?: string;
  @ApiProperty({ description: 'Last name of the user', example: 'Doe' })
  @IsString()
  lastName?: string;
  @ApiProperty({ description: 'Avatar URL of the user', example: 'https://example.com/avatar.jpg' })
  @IsString()
  avatarUrl?: string;
}
