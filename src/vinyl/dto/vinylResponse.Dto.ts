import { VinylResponseTypes } from '../vinylResponseTypes';

export class VinylResponseDto {
  id: number;
  name: string;
  authorName: string;
  description: string;
  price: number;
  averageRating: number;
  reviewsCount: number;
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
