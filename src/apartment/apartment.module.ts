import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentController } from './apartment.controller';
import { ApartmentService } from './apartment.service';
import { CanHo as Apartment } from 'output/entities/CanHo';

@Module({
  imports: [TypeOrmModule.forFeature([Apartment])],
  controllers: [ApartmentController],
  providers: [ApartmentService],
})
export class ApartmentModule {}
