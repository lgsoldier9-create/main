import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Review } from './review.entity';
import { UserRole } from 'src/user/user-role.enum';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  birthdate: Date;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ default: 'local' })
  authProvider: string;

  @Column({ nullable: true, unique: true })
  googleId?: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  hashedPassword: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
