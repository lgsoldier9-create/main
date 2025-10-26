import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './entities/user.entities';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Review } from './entities/review.entity';
import { Vinyl } from './entities/vinyl.entity';
import { ReviewModule } from './review/review.module';
import { VinylService } from './vinyl/vinyl.service';
import { VinylModule } from './vinyl/vinyl.module';
import { StripeModule } from './stripe/stripe.module';
import { Purchase } from './entities/purchase.entity';
import { PurchaseItem } from './entities/purchase-item.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forRoot({
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
    }),
    AuthModule,
    UserModule,
    ReviewModule,
    VinylModule,
    StripeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
