import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import CreateChargeDto from './dto/CreateChart.dto';
import StripeService from './stripe.service';

@Controller('charge')
export default class ChargeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  async createCharge(@Body() charge: CreateChargeDto, @Req() request) {
    await this.stripeService.charge(
      charge.amount,
      charge.paymentMethodId,
      request.user.stripeCustomerId,
    );
  }
}
