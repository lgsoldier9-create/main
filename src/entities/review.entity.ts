import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entities';
import { Vinyl } from './vinyl.entity';

@Entity({ name: 'reviews' })
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  rating: number;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ManyToOne(() => Vinyl, (vinyl) => vinyl.reviews)
  vinyl: Vinyl;
}
