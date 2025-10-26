import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/entities/review.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateReviewDto } from './dto/createReviewDto';
import { User } from 'src/entities/user.entities';
import { Vinyl } from 'src/entities/vinyl.entity';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Vinyl)
    private vinylRepository: Repository<Vinyl>,
  ) {}
  async create(
    vinylId: number,
    userId: number,
    createReviewDto: CreateReviewDto,
  ) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const vinyl = await this.vinylRepository.findOne({
      where: { id: vinylId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!vinyl) {
      throw new NotFoundException('Vinyl not found');
    }
    const reviewData: DeepPartial<Review> = {
      content: createReviewDto.content,
      rating: createReviewDto.rating,
      user: { id: userId } as User,
      vinyl: { id: vinylId } as Vinyl,
    };

    const review = this.reviewRepository.create(reviewData);
    return await this.reviewRepository.save(review);
  }
  async delete(id: number) {
    return await this.reviewRepository.delete(id);
  }
  async getReviews(paginationDto: PaginationDto, vinylId: number) {
    return await this.reviewRepository.find({
      skip: paginationDto.page * paginationDto.limit,
      take: paginationDto.limit,
      where: { vinyl: { id: vinylId } },
    });
  }
}
