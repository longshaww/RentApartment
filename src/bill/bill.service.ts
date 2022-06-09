import { Injectable } from '@nestjs/common';
import { getManager, Repository } from 'typeorm';
import { CreateBillDto } from './dto/create-bill.dto';
import { CanHo as Apartment } from 'src/entities/CanHo';
import { KhachHang as Customer } from '../entities/KhachHang';
import { PhieuDatPhong as Bill } from '../entities/PhieuDatPhong';
import { ChiTietDatPhong as BillDetail } from '../entities/ChiTietDatPhong';
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

  async findAll(maBct?: string) {
    try {
      const bills = await this.billRepository.find({ relations });

      const result = bills.map((bill: any) => {
        bill.id = bill.maDatPhong;
        bill.tenCanHo = bill.canHo.tenCanHo;
        bill.tenBct = bill.canHo.maBct2.tenBct;
        bill.hinhAnhBcts = bill.canHo.maBct2.hinhAnhBcts[0].urlImageBct;
        bill.tenKH = bill.maKhachHang2.ten;
        bill.tongTienCanHo = bill.chiTietDatPhongs[0].tongTienCanHo;
        bill.ngayTao = moment(bill.ngayTao).format('ll');
        delete bill.chiTietDatPhongs;
        delete bill.canHo;
        delete bill.maKhachHang2;
        delete bill.maKhachHang;
        delete bill.maDatPhong;
        delete bill.maCanHo;
        return bill;
      });

      if (maBct) {
        const filter = result.filter((bill) => bill.maBct === maBct);
        return filter;
      }
      return result;
    } catch (err) {
      throw err;
    }
  }
  async create(createBillDto: CreateBillDto) {
    try {
      //create new customer
      const newCustomer = this.customerRepository.create({
        maKhachHang: createBillDto.maKhachHang,
        ten: createBillDto.ten,
        email: createBillDto.email,
        sdt: createBillDto.sdt,
        yeuCau: createBillDto.yeuCau,
      });
      await this.customerRepository.save(newCustomer);

      //then create newBill
      const newBill = this.billRepository.create({
        maDatPhong: `DP${shortid.generate()}`,
        thue: createBillDto.thue,
        tongTien: createBillDto.tongTien,
        ngayTao: createBillDto.ngayTao,
        trangThai: createBillDto.trangThai,
        maCanHo: createBillDto.maCanHo,
        maBct: createBillDto.maBct,
        maKhachHang: newCustomer.maKhachHang,
      });
      await this.billRepository.save(newBill);

      //then create newCTDP;
      const newBillDetail = this.billDetailRepository.create({
        maChiTietDatPhong: `CTDP${shortid.generate()}`,
        maBct: createBillDto.maBct,
        maCanHo: createBillDto.maCanHo,
        maDatPhong: newBill.maDatPhong,
        maKhachHang: newCustomer.maKhachHang,
        tongTienCanHo: createBillDto.tongTienCanHo,
        soLuongCanHo: createBillDto.soLuongCanHo,
        thoiGianNhan: createBillDto.thoiGianNhan,
        thoiGianTra: createBillDto.thoiGianTra,
      });
      await this.billDetailRepository.save(newBillDetail);

      const modifyApartment = await this.apartmentRepository.findOneOrFail({
        where: { maCanHo: createBillDto.maCanHo },
      });
      await this.apartmentRepository.save({
        ...modifyApartment,
        soLuongCon: modifyApartment.soLuongCon - createBillDto.soLuongCanHo,
      });

      //NgayDaDat
      const billResult = await this.findOne(newBill.maDatPhong);
      return billResult;
    } catch (err) {
      throw err;
    }
  }

  async findAllWithChart(maBct: string) {
    let days = [];
    try {
      const manager = getManager();
      const getAll =
        await manager.query(`select PhieuDatPhong.MaDatPhong,PhieuDatPhong.MaBCT,PhieuDatPhong.MaCanHo,PhieuDatPhong.MaKhachHang,
                  Thue,TongTien,NgayTao,TongTienCanHo,SoLuongCanHo,ThoiGianNhan,ThoiGianTra
                  from PhieuDatPhong
                  inner join ChiTietDatPhong on PhieuDatPhong.MaDatPhong = ChiTietDatPhong.MaDatPhong
                  where PhieuDatPhong.MaBCT = '${maBct}'`);
      if (!getAll.length) {
        return [];
      }
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
            const agg = result[i].bills.reduce((a: any, b: any) => {
              return a + b.TongTien;
            }, 0);
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

      const total = result.reduce((a, b) => a + b.bills, 0);
      return { total: Math.round(total), data: result };
    } catch (err) {
      throw err;
    }
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
            const agg = result[i].bills.reduce((a: any, b: any) => {
              return a + b.TongTien;
            }, 0);
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
      const total = result.reduce((a, b) => a + b.bills, 0);
      return { total: Math.round(total), data: result };
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: string) {
    try {
      const bill: any = await this.billRepository.findOneOrFail({
        relations,
        where: { maDatPhong: id },
      });
      bill.id = bill.maDatPhong;
      bill.tenCanHo = bill.canHo.tenCanHo;
      bill.tenBct = bill.canHo.maBct2.tenBct;
      bill.hinhAnhBcts = bill.canHo.maBct2.hinhAnhBcts[0].urlImageBct;
      bill.tenKH = bill.maKhachHang2.ten;
      bill.tongTienCanHo = bill.chiTietDatPhongs[0].tongTienCanHo;
      bill.soLuongCanHo = bill.chiTietDatPhongs[0].soLuongCanHo;
      bill.sdt = bill.maKhachHang2.sdt;
      bill.email = bill.maKhachHang2.email;
      delete bill.chiTietDatPhongs;
      delete bill.canHo;
      delete bill.maKhachHang2;
      delete bill.maKhachHang;
      delete bill.maDatPhong;
      delete bill.maCanHo;
      return bill;
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
