// src/stripe/stripe.service.ts
import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiProperty } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseItem } from 'src/entities/purchase-item.entity';
import { Purchase } from 'src/entities/purchase.entity';
import { Vinyl } from 'src/entities/vinyl.entity';
import { PurchaseStatus } from 'src/enums/purchase-status';
import Stripe from 'stripe';
import { In, Repository } from 'typeorm';

export class CreatePaymentIntentDto {
  amount: number;
  currency?: string;
  metadata?: any;
}

export class CreateCheckoutSessionDto {
  @ApiProperty({
    description: 'List of vinyl IDs to create a checkout session',
    example: ['1', '2', '3'],
  })
  vinylIds: string[];

  @ApiProperty({
    description: 'URL to redirect after a successful checkout',
    example: 'https://example.com/checkout-success',
  })
  successUrl: string;

  @ApiProperty({
    description: 'URL to redirect after a cancelled checkout',
    example: 'https://example.com/checkout-failed',
  })
  cancelUrl: string;
}

@Injectable()
export class StripeService {
  private readonly logger = new Logger(StripeService.name);
  private stripe: Stripe;

  constructor(
    @InjectRepository(Vinyl)
    private vynilRepository: Repository<Vinyl>,
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
    @InjectRepository(PurchaseItem)
    private purchaseItemRepository: Repository<PurchaseItem>,
    private configService: ConfigService,
  ) {
    const stripeSecretKey = this.configService.get<string>('STRIPE_SECRET_KEY');

    if (!stripeSecretKey) {
      throw new Error(
        'STRIPE_SECRET_KEY is not defined in environment variables',
      );
    }

    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-09-30.clover',
    });
  }

  async createCheckoutSession(
    createCheckoutSessionDto: CreateCheckoutSessionDto,
    userId: number,
  ) {
    try {
      const { vinylIds, successUrl, cancelUrl } = createCheckoutSessionDto;

      const vinyls = await this.vynilRepository.find({
        where: { id: In(vinylIds) },
      });

      const lineItems = vinyls.map((vinyl) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: vinyl.name,
            description: `by ${vinyl.authorName}`,
            metadata: {
              vinylId: vinyl.id,
            },
          },
          unit_amount: Math.round(vinyl.price * 100),
        },
        quantity: 1,
      }));

      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          vinylIds: vinylIds.join(','),
        },
      });
      const totalAmount = vinyls.reduce(
        (previousValue, currentValue) => previousValue + Number(currentValue.price),
        0,
      );

      const purchase = this.purchaseRepository.create({
        amount: totalAmount,
        status: PurchaseStatus.PENDING,
        userId: userId,
        sessionId: session.id,
      });

      const savedPurchase = await this.purchaseRepository.save(purchase);

      const purchaseItems = vinyls.map((vinyl) => ({
        purchase: savedPurchase,
        purchaseId: savedPurchase.id,
        vinylId: vinyl.id,
        vinyl: vinyl,
      }));

      await this.purchaseItemRepository.save(purchaseItems);

      this.logger.log(`Checkout session created: ${session.id}`);

      return {
        sessionId: session.id,
        url: session.url,
        expiresAt: new Date(session.expires_at * 1000),
      };
    } catch (error) {
      this.logger.error('Failed to create checkout session:', error);
      throw new BadRequestException(
        `Checkout session creation failed: ${error.message}`,
      );
    }
  }

  async handleSuccessWebhook(sessionId: string) {
    return await this.purchaseRepository.update(sessionId, {
      status: PurchaseStatus.COMPLETED,
    });
  }

  async handleFailedWebhook(sessionId: string) {
    return await this.purchaseRepository.update(sessionId, {
      status: PurchaseStatus.COMPLETED,
    });
  }
}
