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
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'final',
      entities: [User, Review, Vinyl, Purchase, PurchaseItem],
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
