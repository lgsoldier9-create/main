import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Review } from './review.entity';
import { PurchaseItem } from './purchase-item.entity';
@Entity({ name: 'vinyls' })
export class Vinyl {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  authorName: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  price: number;

  @OneToMany(() => PurchaseItem, (purchaseItem) => purchaseItem.vinyl)
  purchaseItems: PurchaseItem[];

  @OneToMany(() => Review, (review) => review.vinyl)
  reviews: Review[];
  get averageRating(): number {
    if (!this.reviews || this.reviews.length === 0) return 0;

    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / this.reviews.length;
  }
}
