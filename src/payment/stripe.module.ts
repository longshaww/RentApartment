import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import StripeController from './stripe.controller';
import StripeService from './stripe.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
