import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth.service';
import { User } from 'src/entities/user.entities';

interface JwtPayload {
  sub: number;
  iat?: number;
  exp?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
}
interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    role?: string;
  };
}
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header required');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Not authorized');
    }

    try {
      if (this.authService.isTokenBlacklisted(token)) {
        throw new UnauthorizedException('Token has been invalidated');
      }

      const decoded: JwtPayload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      const userData: User | null = await this.usersService.findOneById(
        decoded.sub,
      );
      if (!userData) {
        throw new UnauthorizedException('User not found');
      }
      request.user = {
        id: userData.id,
        email: userData.email || '',
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        role: userData.role,
      };

      return true;
    } catch (error) {
      console.error('AuthGuard error:', error);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid token');
    }
  }
}
