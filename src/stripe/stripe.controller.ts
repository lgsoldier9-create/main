// src/stripe/stripe.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  StripeService,
  CreatePaymentIntentDto,
  CreateCheckoutSessionDto,
} from './stripe.service';
import { AuthGuard } from 'src/auth/guards/jwt.auth.guard';
interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}
@Controller('payments')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-checkout-session')
  @UseGuards(AuthGuard)
  async createCheckoutSession(
    @Body() createCheckoutSessionDto: CreateCheckoutSessionDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.stripeService.createCheckoutSession(
      createCheckoutSessionDto,
      req.user.id,
    );
  }

  @Get('webhook/success')
  async handleSuccessWebhook(
    @Query('session_id') sessionId: string,
    @Query('payment_intent') paymentIntentId: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    return await this.stripeService.handleSuccessWebhook(sessionId);
  }

  @Get('webhook/fail')
  async handleFailedWebhook(
    @Query('session_id') sessionId: string,
    @Query('payment_intent') paymentIntentId: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    return await this.stripeService.handleFailedWebhook(sessionId);
  }
}
