import { Injectable } from '@nestjs/common';
import { CanHo as Apartment } from '../../output/entities/CanHo';
import { HinhAnhCanHo as ApartmentImage } from 'output/entities/HinhAnhCanHo';
import { TienNghiCanHo as ApartmentCovenient } from 'output/entities/TienNghiCanHo';
import { CanHoTienNghiCanHo as ApartmentXApartmentCovenient } from 'output/entities/CanHoTienNghiCanHo';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApartmentRelations as relations } from '../relations/relations';
import { GetOneApartmentDto } from './dto/getOne-apartment.dto';
import { UpdateApartmentDTO } from './dto/update-apartment.dto';
import { CreateApartmentDto } from './dto/create-apartment.dto';
const shortid = require('shortid');
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
            maTienNghiCanHo2: convenient[i],
          },
        );
        newCovenient.canHo = newApartment;
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
      return newApartment;
    } catch (err) {
      throw err;
    }
  }

  async getAll(tenCanHo: string): Promise<Apartment[]> {
    if (tenCanHo) {
      return await this.apartmentRepository.find({
        relations,
        where: {
          tenCanHo: tenCanHo,
        },
      });
    }
    return await this.apartmentRepository.find({
      relations,
    });
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
      return apartment;
    } catch (err) {
      throw err;
    }
  }
  async update(id: GetOneApartmentDto, updateApartmentDto: UpdateApartmentDTO) {
    try {
      await this.apartmentRepository.update(id, updateApartmentDto);
      const findAndReturn = await this.apartmentRepository.find(id);
      return findAndReturn;
    } catch (err) {
      throw err;
    }
  }
  async remove(id: GetOneApartmentDto) {
    try {
      await this.apartmentImageRepository.delete({
        canHo: id,
      });
      return await this.apartmentRepository.delete(id);
    } catch (err) {
      throw err;
    }
  }
}
