import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entities';
import * as bcrypt from 'bcryptjs';
import { CreateGoogleUserDto } from './dto/createGoogleUserDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { Purchase } from 'src/entities/purchase.entity';
import { Review } from 'src/entities/review.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
    @InjectRepository(Purchase)
    private purchasesRepository: Repository<Purchase>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { firstName, lastName, birthdate, email, password, avatarUrl, role } =
      createUserDto;
    const IsEmail = await this.usersRepository.findOne({ where: { email } });
    if (IsEmail) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData: Partial<User> = {
      firstName,
      lastName,
      birthdate,
      email,
      authProvider: 'local',
      hashedPassword: hashedPassword,
      avatarUrl,
      role,
    };
    const newUser = this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return { message: 'User created successfully' };
  }
  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }
  findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }
  async updateUserById(id: number, updateData: UpdateUserDto) {
    await this.usersRepository.update({ id }, { ...updateData });
    return { message: 'User updated successfully' };
  }
  deleteUserById(id: number) {
    return this.usersRepository.delete({ id });
  }
  async createGoogleUser(
    createGoogleUserDto: CreateGoogleUserDto,
  ): Promise<User> {
    const { firstName, lastName, email, avatarUrl, googleId } =
      createGoogleUserDto;

    const existingUser = await this.usersRepository.findOne({
      where: [{ email }, { googleId }],
    });

    if (existingUser) {
      if (existingUser.email === email && !existingUser.googleId) {
        existingUser.googleId = googleId;
        existingUser.authProvider = 'google';
        return await this.usersRepository.save(existingUser);
      }
      if (existingUser.googleId === googleId) {
        return existingUser;
      }
      throw new ConflictException(
        'User with this email or Google ID already exists',
      );
    }

    const userData: Partial<User> = {
      firstName,
      lastName,
      email,
      googleId,
      authProvider: 'google',
      hashedPassword: '',
      avatarUrl,
    };

    const newUser = this.usersRepository.create(userData);
    return await this.usersRepository.save(newUser);
  }
  async getProfile(userId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const reviews = await this.reviewsRepository.find({ where: { user: { id: userId } } });
    const purchases = await this.purchasesRepository.find({ where: { user: { id: userId } } })
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      birthdate: user.birthdate,
      avatarUrl: user.avatarUrl,
      reviews: reviews || [],
      purchases: purchases || [],
    };
  }
}