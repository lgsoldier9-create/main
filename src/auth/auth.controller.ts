import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { Request } from 'express';
import { AuthGuard } from './guards/jwt.auth.guard';
interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{
    message: string;
    token: string;
  }> {
    return this.authService.login(loginDto);
  }
  @Post('logout')
  @UseGuards(AuthGuard)
  logout(@Req() req: any) {
    const token = this.extractTokenFromHeader(req);

    if (token) {
      this.authService.logout(token);
    }

    return {
      message: 'Logout successful',
    };
  }
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {}
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleCallback(@Req() req: AuthenticatedRequest) {
    const user = req.user;
    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      accessToken: this.authService.generateToken(user),
    };
  }
  extractTokenFromHeader(request: any): string | null {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }
}
