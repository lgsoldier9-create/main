import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PurchaseStatus } from 'src/enums/purchase-status';
import { Purchase } from './purchase.entity';
import { Vinyl } from './vinyl.entity';

@Entity({ name: 'purchase_item' })
export class PurchaseItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Purchase, (purchase) => purchase.purchaseItems)
  purchase: Purchase;

  @Column()
  purchaseId: number;

  @Column()
  vinylId: number;

  @OneToOne(() => Vinyl)
  @JoinColumn()
  vinyl: Vinyl;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
