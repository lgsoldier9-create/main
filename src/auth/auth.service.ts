import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import { User } from 'src/entities/user.entities';
import { CreateUserDto } from 'src/user/dto/createUserDto';
import { CreateGoogleUserDto } from 'src/user/dto/createGoogleUserDto';
@Injectable()
export class AuthService {
  private blacklistedTokens = new Set<string>();
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    dotenv.config({ path: '.env' });
  }
  generateToken(user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  }): string {
    const payload = {
      sub: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return this.jwtService.sign(payload);
  }
  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.hashedPassword);
  }

  async login(loginDto: LoginDto): Promise<{
    message: string;
    token: string;
  }> {
    const { email, password } = loginDto;

    if (!email || !password) {
      throw new UnauthorizedException('Please write both email and password');
    }

    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isPasswordValid = await this.validatePassword(user, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    return {
      message: 'Login successful',
      token: token,
    };
  }
  async validateGoogleUser(googleUser: CreateGoogleUserDto): Promise<User> {
    return await this.userService.createGoogleUser(googleUser);
  }
  logout(token: string): void {
    this.blacklistedTokens.add(token);
  }
  isTokenBlacklisted(token: string): boolean {
    return this.blacklistedTokens.has(token);
  }
}
