import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { LessorModule } from './lessor/lessor.module';
import { ApartmentModule } from './apartment/apartment.module';
import { BillModule } from './bill/bill.module';
import { BookedDateModule } from './booked-date/booked-date.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { JwtStrategy } from './auth/jwt.strategy';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    ApartmentModule,
    LessorModule,
    TypeOrmModule.forRoot(config),
    BillModule,
    BookedDateModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        STRIPE_SECRET_KEY: Joi.string(),
        STRIPE_CURRENCY: Joi.string(),
        FE_URL: Joi.string(),
        // ...
      }),
    }),
    RouterModule.register([
      {
        path: 'api',
        module: AppModule,
        children: [
          {
            path: '/',
            module: ApartmentModule,
          },
          {
            path: '/',
            module: LessorModule,
          },
          {
            path: '/',
            module: BillModule,
          },
          {
            path: '/',
            module: BookedDateModule,
          },
        ],
      },
    ]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy,
    // { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}
