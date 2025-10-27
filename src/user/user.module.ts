import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entities';
import { AuthModule } from 'src/auth/auth.module';
import { Review } from 'src/entities/review.entity';
import { Purchase } from 'src/entities/purchase.entity';
@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User, Review, Purchase])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }
