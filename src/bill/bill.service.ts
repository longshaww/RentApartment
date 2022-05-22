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

  async charge(amount: number, customerId: string) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      customer: customerId,
      automatic_payment_methods: {
        enabled: true,
      },
      currency: this.configService.get('STRIPE_CURRENCY'),
    });
    return paymentIntent.client_secret;
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

  async findAll() {
    try {
      const manager = getManager();
      const getAll =
        await manager.query(`select PhieuDatPhong.MaDatPhong,PhieuDatPhong.MaBCT,PhieuDatPhong.MaCanHo,PhieuDatPhong.MaKhachHang,
                  Thue,TongTien,NgayTao,TongTienCanHo,SoLuongCanHo,ThoiGianNhan,ThoiGianTra
                  from PhieuDatPhong
                  inner join ChiTietDatPhong on PhieuDatPhong.MaDatPhong = ChiTietDatPhong.MaDatPhong`);
      for (let i = 0; i < getAll.length; i++) {
        const khachHang = await manager.query(`select * 
                                          from KhachHang
                                          where KhachHang.MaKhachHang = '${getAll[i].MaKhachHang}'`);

        getAll[i].khachHang = khachHang[0];
      }
      return getAll;
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
