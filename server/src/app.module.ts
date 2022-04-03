import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { LessorModule } from './lessor/lessor.module';
import { ApartmentModule } from './apartment/apartment.module';

@Module({
  imports: [ApartmentModule, LessorModule, TypeOrmModule.forRoot(config)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
