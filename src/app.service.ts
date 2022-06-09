import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  greeting(): Object {
    return {
      success: true,
      message: 'Welcome to Traveloka !',
      description: 'Develope by LongTran',
    };
  }
}
