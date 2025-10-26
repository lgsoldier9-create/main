// src/stripe/stripe.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vinyl } from 'src/entities/vinyl.entity';
import { Purchase } from 'src/entities/purchase.entity';
import { PurchaseItem } from 'src/entities/purchase-item.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Vinyl, Purchase, PurchaseItem]),
    AuthModule,
    UserModule,
  ],
  providers: [StripeService],
  controllers: [StripeController],
  exports: [StripeService],
})
export class StripeModule {}
