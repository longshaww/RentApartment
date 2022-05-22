import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import CreateChargeDto from './dto/CreateCharge.dto';
import StripeService from './stripe.service';

@ApiTags('Charge')
@Controller('charge')
export default class StripeController {
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
