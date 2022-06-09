import { Controller, Get, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';

const AllowUnauthorizedRequest = () =>
  SetMetadata('allowUnauthorizedRequest', true);

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Object {
    return this.appService.greeting();
  }
}
