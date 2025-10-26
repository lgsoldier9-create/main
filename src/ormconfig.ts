import { DataSource } from 'typeorm';
import { User } from './entities/user.entities';
import { Review } from './entities/review.entity';
import { Vinyl } from './entities/vinyl.entity';
import { Purchase } from './entities/purchase.entity';
import { PurchaseItem } from './entities/purchase-item.entity';

export default new DataSource({
  type: 'postgres',
  host: 'dpg-d3v3scur433s73ck2nb0-a.oregon-postgres.render.com',
  port: 5432,
  username: 'final_ep12_user',
  password: 'yYlvgoC4mZ9Dljy3nduSLTwvrszAhoQQ',
  database: 'final_ep12',
  entities: [User, Review, Vinyl, Purchase, PurchaseItem],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  migrations: ['src/migrations/*.ts'],
});
