import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentController } from './apartment.controller';
import { ApartmentService } from './apartment.service';
import { CanHo as Apartment } from 'output/entities/CanHo';
import { HinhAnhCanHo as ApartmentImage } from 'output/entities/HinhAnhCanHo';

@Module({
  imports: [TypeOrmModule.forFeature([Apartment, ApartmentImage])],
  controllers: [ApartmentController],
  providers: [ApartmentService],
})
export class ApartmentModule {}
