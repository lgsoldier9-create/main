import { ApiProperty } from '@nestjs/swagger';
import { VinylResponseTypes } from '../vinylResponseTypes';
export class VinylResponseDto {
  @ApiProperty({ description: 'Id of the vinyl', example: 1 })
  id: number;
  @ApiProperty({ description: 'Name of the vinyl', example: 'The Beatles - Sgt. Pepper\'s Lonely Hearts Club' })
  name: string;
  @ApiProperty({ description: 'Author name of the vinyl', example: 'John Lennon, Paul McCartney, George Harrison, Pete Best' })
  authorName: string;
  @ApiProperty({ description: 'Description of the vinyl', example: 'The Beatles - Sgt. Pepper\'s Lonely Hearts Club is the eighth studio album by the English rock band The Beatles, released on 1 June 1967.' })
  description: string;
  @ApiProperty({ description: 'Price of the vinyl', example: 25.99 })
  price: number;
  @ApiProperty({ description: 'Average rating of the vinyl', example: 4.5 })
  averageRating: number;
  @ApiProperty({ description: 'Number of reviews for the vinyl', example: 10 })
  reviewsCount: number;
  @ApiProperty({ description: 'First review of the vinyl', example: 'This is the best album of all time.' })
  firstReview?: string;

  constructor(vinyl: VinylResponseTypes) {
    this.id = vinyl.id;
    this.name = vinyl.name;
    this.authorName = vinyl.authorName;
    this.description = vinyl.description;
    this.price = vinyl.price;
    this.averageRating = vinyl.averageRating ? parseFloat(vinyl.averageRating) : 0;
    this.reviewsCount = vinyl.reviewsCount || 0;
    this.firstReview = vinyl.firstReview || undefined;
  }
}
