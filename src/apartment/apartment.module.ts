import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentController } from './apartment.controller';
import { ApartmentService } from './apartment.service';
import { CanHo as Apartment } from 'output/entities/CanHo';
import { HinhAnhCanHo as ApartmentImage } from 'output/entities/HinhAnhCanHo';
import { TienNghiCanHo as ApartmentCovenient } from 'output/entities/TienNghiCanHo';
import { CanHoTienNghiCanHo as ApartmentXApartmentCovenient } from 'output/entities/CanHoTienNghiCanHo';
import { ChiTietDatPhong } from 'output/entities/ChiTietDatPhong';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Apartment,
      ApartmentImage,
      ApartmentCovenient,
      ApartmentXApartmentCovenient,
      ChiTietDatPhong,
    ]),
    MulterModule.register({
      dest: join(__dirname, '../..', 'upload'),
    }),
  ],
  controllers: [ApartmentController],
  providers: [ApartmentService],
})
export class ApartmentModule {}
