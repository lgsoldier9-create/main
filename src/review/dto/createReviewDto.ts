import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
export class CreateReviewDto {
  @ApiProperty({
    description: 'Content of the review',
    example: 'This vinyl is amazing!',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'Rating of the review',
    example: 5,
  })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  rating: number;
}
