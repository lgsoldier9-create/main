import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PurchaseStatus } from 'src/enums/purchase-status';
import { PurchaseItem } from './purchase-item.entity';

@Entity({ name: 'purchase' })
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  amount: number;

  @Column()
  userId: number;

  @Column({ type: 'varchar' })
  sessionId: string;

  @Column({ type: 'enum', enum: PurchaseStatus })
  status: PurchaseStatus;

  @OneToMany(() => PurchaseItem, (purchaseItem) => purchaseItem.purchase)
  purchaseItems: PurchaseItem[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
