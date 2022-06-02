import { Injectable } from '@nestjs/common';
import { getManager, Repository } from 'typeorm';
import { CreateBillDto } from './dto/create-bill.dto';
import { CanHo as Apartment } from 'output/entities/CanHo';
import { KhachHang as Customer } from '../../output/entities/KhachHang';
import { PhieuDatPhong as Bill } from '../../output/entities/PhieuDatPhong';
import { ChiTietDatPhong as BillDetail } from '../../output/entities/ChiTietDatPhong';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { BillRelations as relations } from '../relations/relations';
import { CreatePaymentDto } from './dto/creat-payment.dto';
import * as moment from 'moment';
const shortid = require('shortid');

@Injectable()
export class BillService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(Bill)
    private billRepository: Repository<Bill>,
    @InjectRepository(BillDetail)
    private billDetailRepository: Repository<BillDetail>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Apartment)
    private apartmentRepository: Repository<Apartment>,
    private configService: ConfigService,
  ) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2020-08-27',
    });
  }

  calculateAmount(amount: any) {
    const toUsd = amount / 23;
    const total = parseInt(toUsd.toFixed(2).replace('.', ''));
    return total;
  }
  async charge(createPaymentDto: CreatePaymentDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: this.calculateAmount(createPaymentDto.amount),
      // customer: createPaymentDto.customerId,
      automatic_payment_methods: {
        enabled: true,
      },
      currency: this.configService.get('STRIPE_CURRENCY'),
    });
    return paymentIntent.client_secret;
  }

  async findAll() {
    try {
      const bills = await this.billRepository.find({ relations });
      // bills.map((bill: any) => {
      //   bill.canHo = bill.canHo.tenCanHo;
      //   bill.maBct2 = bill.maBct2.tenBct;
      //   bill.hinhAnhBcts = bill.maBct2.hinhAnhBcts[0];
      //   return bill;
      // });
      return bills;
    } catch (err) {
      throw err;
    }
  }
  async create(createBillDto: CreateBillDto): Promise<Bill> {
    //create new customer
    const newCustomer = this.customerRepository.create();
    newCustomer.maKhachHang = `KH${shortid.generate()}`;
    newCustomer.ten = createBillDto.ten;
    newCustomer.email = createBillDto.email;
    newCustomer.sdt = createBillDto.sdt;
    newCustomer.yeuCau = createBillDto.yeuCau;
    await this.customerRepository.save(newCustomer);

    //then create newBill
    const newBill = this.billRepository.create();
    newBill.maDatPhong = `DP${shortid.generate()}`;
    newBill.thue = createBillDto.thue;
    newBill.tongTien = createBillDto.tongTien;
    newBill.ngayTao = createBillDto.ngayTao;
    newBill.trangThai = createBillDto.trangThai;
    newBill.maCanHo = createBillDto.maCanHo;
    newBill.maBct = createBillDto.maBct;
    newBill.maKhachHang = newCustomer.maKhachHang;
    const billSaved = await this.billRepository.save(newBill);

    //then create newCTDP;
    const newBillDetail = this.billDetailRepository.create();
    newBillDetail.maChiTietDatPhong = `CTDP${shortid.generate()}`;
    newBillDetail.maCanHo = createBillDto.maCanHo;
    newBillDetail.maBct = createBillDto.maBct;
    newBillDetail.maDatPhong = newBill.maDatPhong;
    newBillDetail.maKhachHang = newCustomer.maKhachHang;
    newBillDetail.tongTienCanHo = createBillDto.tongTienCanHo;
    newBillDetail.soLuongCanHo = createBillDto.soLuongCanHo;
    newBillDetail.thoiGianNhan = createBillDto.thoiGianNhan;
    newBillDetail.thoiGianTra = createBillDto.thoiGianTra;
    await this.billDetailRepository.save(newBillDetail);

    const modifyApartment = await this.apartmentRepository.findOneOrFail({
      where: { maCanHo: createBillDto.maCanHo },
    });
    await this.apartmentRepository.save({
      ...modifyApartment,
      soLuongCon: modifyApartment.soLuongCon - createBillDto.soLuongCanHo,
    });

    //NgayDaDat

    return billSaved;
  }

  async chart() {
    let days = [];
    try {
      const manager = getManager();
      const getAll =
        await manager.query(`select PhieuDatPhong.MaDatPhong,PhieuDatPhong.MaBCT,PhieuDatPhong.MaCanHo,PhieuDatPhong.MaKhachHang,
                  Thue,TongTien,NgayTao,TongTienCanHo,SoLuongCanHo,ThoiGianNhan,ThoiGianTra
                  from PhieuDatPhong
                  inner join ChiTietDatPhong on PhieuDatPhong.MaDatPhong = ChiTietDatPhong.MaDatPhong`);

      let diffArr = [];
      for (let i = 0; i < getAll.length; i++) {
        var current = getAll[i].NgayTao;
        const diff = moment(current).diff(moment(), 'days');
        diffArr.push(diff);
      }
      let smallest = diffArr[0];
      for (var i = 1; i < diffArr.length; i++) {
        if (diffArr[i] < smallest) {
          smallest = diffArr[i];
        }
      }
      const index = diffArr.indexOf(smallest);
      for (let i = 0; i < 7; i++) {
        days.push(moment(getAll[index].NgayTao).add(i, 'days'));
      }

      const result = days.map((d: any) => {
        const filterBills = getAll.filter((b: any) =>
          moment(b.NgayTao).isSame(d, 'days'),
        );
        return {
          day: d,
          bills: filterBills,
        };
      });

      for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].bills.length; j++) {
          if (result[i].bills.length > 1) {
            const agg = result[i].bills.reduce(
              (a: any, b: any) => a.TongTien + b.TongTien,
            );
            result[i].bills = agg;
          } else {
            const [price] = result[i].bills.map((a: any) => a.TongTien);
            result[i].bills = price;
          }
        }
      }
      result.map((r) => {
        if (r.bills.length === 0) {
          r.bills = 0;
        }
        r.day = moment(r.day).format('ll');
      });
      return result;
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: string) {
    const manager = getManager();
    try {
      const getOne =
        await manager.query(`select PhieuDatPhong.MaDatPhong,PhieuDatPhong.MaBCT,PhieuDatPhong.MaCanHo,PhieuDatPhong.MaKhachHang,
                  Thue,TongTien,NgayTao,TongTienCanHo,SoLuongCanHo,ThoiGianNhan,ThoiGianTra
                  from PhieuDatPhong
                  inner join ChiTietDatPhong on PhieuDatPhong.MaDatPhong = ChiTietDatPhong.MaDatPhong
                  where PhieuDatPhong.MaDatPhong = '${id}'`);
      const KhachHang = await manager.query(`select * 
                                            from KhachHang
                                            where KhachHang.MaKhachHang = '${getOne[0].MaKhachHang}'`);
      const obj = getOne[0];
      obj.KhachHang = KhachHang;
      return obj;
    } catch (err) {
      throw err;
    }
  }

  // update(id: number, updateBillDto: UpdateBillDto) {
  //   return `This action updates a #${id} bill`;
  // }

  async remove(id: string) {
    const manager = getManager();
    //delete bill detail
    try {
      await manager.query(`delete
                        from ChiTietDatPhong
                        where ChiTietDatPhong.MaDatPhong = '${id}' `);
      //delete bill
      await manager.query(`delete
                        from PhieuDatPhong
                        where PhieuDatPhong.MaDatPhong = '${id}'`);

      return `Deleted bill ${id}`;
    } catch (err) {
      throw err;
    }
  }
}
