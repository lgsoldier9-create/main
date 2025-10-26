import { DataSource } from 'typeorm';
import { User } from './entities/user.entities';
import { Review } from './entities/review.entity';
import { Vinyl } from './entities/vinyl.entity';
import { Purchase } from './entities/purchase.entity';
import { PurchaseItem } from './entities/purchase-item.entity';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'final',
  entities: [User, Review, Vinyl, Purchase, PurchaseItem],
  migrations: ['src/migrations/*.ts'],
});
