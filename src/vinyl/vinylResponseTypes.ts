export interface VinylResponseTypes {
  id: number;
  name: string;
  authorName: string;
  description: string;
  price: number;
  averageRating?: string | null;
  reviewsCount?: number | null;
  firstReview?: string | null;
}
