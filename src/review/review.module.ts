import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { Review } from 'src/entities/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { Vinyl } from 'src/entities/vinyl.entity';
import { User } from 'src/entities/user.entities';
@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Vinyl]),
    AuthModule,
    UserModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
