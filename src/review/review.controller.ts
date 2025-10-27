import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { AuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { CreateReviewDto } from './dto/createReviewDto';
import { PaginationDto } from './dto/pagination.dto';
import { Roles } from 'src/auth/guards/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/user/user-role.enum';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @ApiResponse({ status: 201, description: 'Create a review' })
  @Post('vinyl/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async create(
    @Param('id') id: number,
    @Body() createReviewDto: CreateReviewDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return await this.reviewService.create(id, req.user.id, createReviewDto);
  }

  @ApiResponse({ status: 204, description: 'Delete a review' })
  @Delete('vinyl/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  async delete(@Param('id') id: number) {
    return await this.reviewService.delete(id);
  }

  @ApiResponse({ status: 200, description: 'Get reviews for a vinyl' })
  @Get('vinyl/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async getReviews(
    @Query() paginationDto: PaginationDto,
    @Param('id') id: number,
  ) {
    return await this.reviewService.getReviews(paginationDto, id);
  }
}
