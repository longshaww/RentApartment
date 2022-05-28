import { Injectable } from '@nestjs/common';
import { CanHo as Apartment } from '../../output/entities/CanHo';
import { HinhAnhCanHo as ApartmentImage } from 'output/entities/HinhAnhCanHo';
import { TienNghiCanHo as ApartmentCovenient } from 'output/entities/TienNghiCanHo';
import { CanHoTienNghiCanHo as ApartmentXApartmentCovenient } from 'output/entities/CanHoTienNghiCanHo';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { ApartmentRelations as relations } from '../relations/relations';
import { ChiTietDatPhong as BillDetail } from 'output/entities/ChiTietDatPhong';
import { UpdateApartmentDTO } from './dto/update-apartment.dto';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import * as moment from 'moment';

const shortid = require('shortid');

async function convenientQueryByID(maCanHo) {
  const manager = getManager();
  return await manager.query(
    `select MaTienNghiCanHo, TenTienNghiCanHo
          from TienNghiCanHo
          where exists  
          (select MaCanHo,MaBCT from CanHo_TienNghiCanHo
          where CanHo_TienNghiCanHo.MaCanHo = '${maCanHo}') `,
  );
}
@Injectable()
export class ApartmentService {
  constructor(
    @InjectRepository(Apartment)
    private apartmentRepository: Repository<Apartment>,
    @InjectRepository(ApartmentImage)
    private apartmentImageRepository: Repository<ApartmentImage>,
    @InjectRepository(ApartmentCovenient)
    private apartmentCovenientRepository: Repository<ApartmentCovenient>,
    @InjectRepository(ApartmentXApartmentCovenient)
    private ApartmentXApartmentCovenientRepository: Repository<ApartmentXApartmentCovenient>,
    @InjectRepository(BillDetail)
    private billDetailRepository: Repository<BillDetail>,
  ) {}

  async create(
    createApartmentDto: CreateApartmentDto,
    hinhAnhCanHos: Array<Express.Multer.File>,
  ): Promise<Apartment> {
    try {
      const newApartment = this.apartmentRepository.create(createApartmentDto);
      newApartment.soLuongCon = 1;
      newApartment.maCanHo = `CH${shortid.generate()}`;
      await this.apartmentRepository.save(newApartment);

      //create new convenient
      const convenient = await this.apartmentCovenientRepository.find();
      for (let i = 0; i < convenient.length; i++) {
        const newCovenient = this.ApartmentXApartmentCovenientRepository.create(
          {
            maCanHo: newApartment.maCanHo,
            maBct: newApartment.maBct,
            maTienNghiCanHo: convenient[i].maTienNghiCanHo,
          },
        );
        await this.ApartmentXApartmentCovenientRepository.save(newCovenient);
      }
      //create new Images
      const listApartmentImages = hinhAnhCanHos.map((item) => item.filename);
      for (let i = 0; i < listApartmentImages.length; i++) {
        const newImage = this.apartmentImageRepository.create({
          maHinhAnhCanHo: `HACH${shortid.generate()}`,
          urlImageCanHo: listApartmentImages[i].toString(),
        });
        newImage.canHo = newApartment;
        await this.apartmentImageRepository.save(newImage);
      }
      const findAndReturn = await this.apartmentRepository.findOneOrFail({
        relations,
        where: {
          maCanHo: newApartment.maCanHo,
        },
      });
      return findAndReturn;
    } catch (err) {
      throw err;
    }
  }

  async getAll(maBct: string): Promise<Apartment[]> {
    //Get Convenient
    const manager = getManager();

    const convenientQuery = await manager.query(
      `select MaTienNghiCanHo, TenTienNghiCanHo
      from TienNghiCanHo
      where exists  
      (select MaCanHo,MaBCT from CanHo_TienNghiCanHo) `,
    );
    //FindByName
    const selectNameCovenient = convenientQuery.map((item: any) => {
      return item.TenTienNghiCanHo;
    });
    if (maBct) {
      const findByName = await this.apartmentRepository.find({
        relations,
        where: {
          maBct: maBct,
        },
      });

      const billDetail = await this.billDetailRepository.find();
      const currentDay = moment(new Date(), 'YYYY-MM-DD');

      for (let i = 0; i < billDetail.length; i++) {
        if (
          moment(currentDay).isSame(
            moment(billDetail[i].thoiGianTra, 'YYYY-MM-DD'),
            'day',
          )
        ) {
          const thisApartment = await this.apartmentRepository.findOneOrFail({
            where: {
              maCanHo: billDetail[i].maCanHo,
            },
          });
          if (
            moment(currentDay).isSame(
              moment(thisApartment.thoiGianCapNhat),
              'day',
            )
          ) {
            return findByName;
          }

          await this.apartmentRepository.save({
            ...thisApartment,
            soLuongCon: thisApartment.soLuongCon + billDetail[i].soLuongCanHo,
            thoiGianCapNhat: new Date(),
          });
        }
        return findByName;
      }

      const customize = findByName.map((item) => {
        item.tienNghiCanHo = selectNameCovenient;
        return item;
      });
      return customize;
    }
    //Get All
    const getAll = await this.apartmentRepository.find({
      relations,
    });
    const customize = getAll.map((item) => {
      item.tienNghiCanHo = selectNameCovenient;
      return item;
    });
    return customize;
  }

  async getOneById(id: string): Promise<Apartment> {
    try {
      const apartment = await this.apartmentRepository.findOne({
        relations,
        where: {
          maCanHo: id,
        },
      });
      const convenientQuery = await convenientQueryByID(id);
      apartment.tienNghiCanHo = convenientQuery;
      return apartment;
    } catch (err) {
      throw err;
    }
  }
  async update(
    id: string,
    updateApartmentDto: UpdateApartmentDTO,
    hinhAnhCanHos: Array<Express.Multer.File>,
  ): Promise<Apartment> {
    try {
      //FindOne
      const updateApartment = await this.apartmentRepository.findOneOrFail({
        where: { maCanHo: id },
      });
      //Then updateDTO
      await this.apartmentRepository.save({
        ...updateApartment,
        tenCanHo: updateApartmentDto.tenCanHo,
        dienTich: updateApartmentDto.dienTich,
        gia: updateApartmentDto.gia,
        soLuongKhach: updateApartmentDto.soLuongKhach,
        soLuongCon: updateApartmentDto.soLuongCon,
        moTa: updateApartmentDto.moTa,
        thongTinGiuong: updateApartmentDto.thongTinGiuong,
      });
      //Update Images
      const manager = getManager();
      await manager.query(`delete from HinhAnhCanHo where MaCanHo = '${id}' `);
      //Add new Images
      const getImages = hinhAnhCanHos.map((image) => image.filename);
      for (let i = 0; i < getImages.length; i++) {
        const newImage = this.apartmentImageRepository.create({
          maHinhAnhCanHo: `HABCT${shortid.generate()}`,
          urlImageCanHo: getImages[i].toString(),
        });
        newImage.canHo = updateApartment;
        await this.apartmentImageRepository.save(newImage);
      }
      const findAndReturn = await this.apartmentRepository.findOneOrFail({
        relations,
        where: { maCanHo: id },
      });

      return findAndReturn;
    } catch (err) {
      throw err;
    }
  }
  async remove(id: string): Promise<Apartment> {
    try {
      //delete convenient
      const manager = getManager();
      await manager.query(`delete
      from CanHo_TienNghiCanHo
      where MaCanHo = '${id}' `);
      // delete Images
      await manager.query(`delete from HinhAnhCanHo where MaCanHo = '${id}' `);

      //Delete apartment
      const findOne = await this.apartmentRepository.findOneOrFail({
        where: { maCanHo: id },
      });
      return await this.apartmentRepository.remove(findOne);
    } catch (err) {
      throw err;
    }
  }
}
