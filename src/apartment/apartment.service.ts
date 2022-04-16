import { Injectable } from '@nestjs/common';
import { CanHo as Apartment } from '../../output/entities/CanHo';
import { HinhAnhCanHo as ApartmentImage } from 'output/entities/HinhAnhCanHo';
import { TienNghiCanHo as ApartmentCovenient } from 'output/entities/TienNghiCanHo';
import { CanHoTienNghiCanHo as ApartmentXApartmentCovenient } from 'output/entities/CanHoTienNghiCanHo';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { ApartmentRelations as relations } from '../relations/relations';
import { GetOneApartmentDto } from './dto/getOne-apartment.dto';
import { UpdateApartmentDTO } from './dto/update-apartment.dto';
import { CreateApartmentDto } from './dto/create-apartment.dto';
const shortid = require('shortid');

async function convenientQueryByID(maCanHo, maBct) {
  const manager = getManager();
  return await manager.query(
    `select MaTienNghiCanHo, TenTienNghiCanHo
          from TienNghiCanHo
          where exists  
          (select MaCanHo,MaBCT from CanHo_TienNghiCanHo
          where CanHo_TienNghiCanHo.MaCanHo = '${maCanHo}' 
          and CanHo_TienNghiCanHo.MaBCT='${maBct}') `,
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
  ) {}

  async create(createApartmentDto: CreateApartmentDto): Promise<Apartment> {
    try {
      const newApartment = this.apartmentRepository.create(createApartmentDto);
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
      const listApartmentImages = createApartmentDto.hinhAnh;
      for (let i = 0; i < listApartmentImages.length; i++) {
        const newImage = this.apartmentImageRepository.create({
          maHinhAnhCanHo: `HACH${shortid.generate()}`,
          urlImageCanHo: listApartmentImages[i].toString(),
        });
        newImage.canHo = newApartment;
        await this.apartmentImageRepository.save(newImage);
      }
      const findAndReturn = await this.apartmentRepository.findOneOrFail({
        where: {
          maBct: newApartment.maBct,
          maCanHo: newApartment.maCanHo,
        },
      });
      const convenientQuery = await convenientQueryByID(
        findAndReturn.maCanHo,
        findAndReturn.maBct,
      );

      findAndReturn.tienNghiCanHo = convenientQuery;
      return findAndReturn;
    } catch (err) {
      throw err;
    }
  }

  async getAll(tenCanHo: string): Promise<Apartment[]> {
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
    if (tenCanHo) {
      const findByName = await this.apartmentRepository.find({
        relations,
        where: {
          tenCanHo: tenCanHo,
        },
      });
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

  async getOneById(id: GetOneApartmentDto): Promise<Apartment> {
    try {
      const maCanHo = id.maCanHo;
      const maBct = id.maBct;

      const apartment = await this.apartmentRepository.findOne({
        relations,
        where: {
          maCanHo,
          maBct,
        },
      });
      const convenientQuery = await convenientQueryByID(maCanHo, maBct);
      apartment.tienNghiCanHo = convenientQuery;
      return apartment;
    } catch (err) {
      throw err;
    }
  }
  async update(
    id: GetOneApartmentDto,
    updateApartmentDto: UpdateApartmentDTO,
  ): Promise<Apartment> {
    try {
      //FindOne
      const updateApartment = await this.apartmentRepository.findOneOrFail(id);
      //Then updateDTO
      await this.apartmentRepository.save({
        ...updateApartment,
        tenCanHo: updateApartmentDto.tenCanHo,
        dienTich: updateApartmentDto.dienTich,
        gia: updateApartmentDto.gia,
        soLuongKhach: updateApartmentDto.soLuongKhach,
        soLuongCon: updateApartmentDto.soLuongCon,
        moTa: updateApartmentDto.moTa,
      });
      //Update Images
      await this.apartmentImageRepository.delete({ canHo: id });
      //Add new Images
      const getImages = updateApartmentDto.hinhAnh;
      for (let i = 0; i < getImages.length; i++) {
        const newImage = this.apartmentImageRepository.create({
          maHinhAnhCanHo: `HABCT${shortid.generate()}`,
          urlImageCanHo: getImages[i].toString(),
        });
        newImage.canHo = updateApartment;
        await this.apartmentImageRepository.save(newImage);
      }
      const findAndReturn = await this.apartmentRepository.findOneOrFail(id);
      const convenientQuery = await convenientQueryByID(
        findAndReturn.maCanHo,
        findAndReturn.maBct,
      );
      findAndReturn.tienNghiCanHo = convenientQuery;
      return findAndReturn;
    } catch (err) {
      throw err;
    }
  }
  async remove(id: GetOneApartmentDto): Promise<Apartment> {
    try {
      //delete convenient
      const manager = getManager();
      await manager.query(`delete
      from CanHo_TienNghiCanHo
      where MaCanHo = '${id.maCanHo}' 
      and MaBCT = '${id.maBct}' `);
      // delete Images
      await this.apartmentImageRepository.delete({
        canHo: id,
      });
      //Delete apartment
      const findOne = await this.apartmentRepository.findOneOrFail(id);
      return await this.apartmentRepository.remove(findOne);
    } catch (err) {
      throw err;
    }
  }
}
