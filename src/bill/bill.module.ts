import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { PhieuDatPhong as Bill } from '../../output/entities/PhieuDatPhong';
import { ChiTietDatPhong as BillDetail } from '../../output/entities/ChiTietDatPhong';
import { KhachHang as Customer } from '../../output/entities/KhachHang';
import { CanHo as Apartment } from '../../output/entities/CanHo';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Bill, BillDetail, Customer, Apartment])],
  controllers: [BillController],
  providers: [BillService],
})
export class BillModule {}
