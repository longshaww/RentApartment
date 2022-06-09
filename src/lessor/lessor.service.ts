import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BenChoThue as Lessor } from '../entities/BenChoThue';
import { HinhAnhBct as LessorImages } from '../entities/HinhAnhBct';
import { LoaILuuTru as TypeStay } from '../entities/LoaILuuTru';
import { TienNghiBenChoThue as LessorCovenient } from '../entities/TienNghiBenChoThue';
import { getManager, Repository } from 'typeorm';
import { LessorRelations as relations } from 'src/relations/relations';
import { CreateLessorDto } from './dto/create-lessor.dto';
import { UpdateLessorDto } from './dto/update-lessor.dto';
import { CanHo as Apartment } from '../entities/CanHo';

const shortid = require('shortid');

@Injectable()
export class LessorService {
  constructor(
    @InjectRepository(Lessor)
    private lessorRepository: Repository<Lessor>,
    @InjectRepository(LessorImages)
    private lessorImagesRepository: Repository<LessorImages>,
    @InjectRepository(TypeStay)
    private typeStayRepository: Repository<TypeStay>,
    @InjectRepository(LessorCovenient)
    private lessorCovenientRepository: Repository<LessorCovenient>,
    @InjectRepository(Apartment)
    private apartmentRepository: Repository<Apartment>,
  ) {}

  async getAll(q: string, partnerID: string): Promise<Lessor[]> {
    const getAll = await this.lessorRepository.find({
      relations,
    });
    if (q) {
      //filter by name
      const filterByName = getAll.filter((item) => {
        return (
          item.tenBct.toLowerCase().indexOf(q.toLowerCase()) !== -1 ||
          item.diaChi.toLowerCase().indexOf(q.toLowerCase()) !== -1
        );
      });

      return filterByName;
    }
    if (partnerID) {
      const filterByPartnerID = getAll.filter((item) => {
        return item.maPartner === partnerID;
      });
      return filterByPartnerID;
    }
    if (q && partnerID) {
      const filter = getAll.filter((item) => {
        return (
          (item.tenBct.toLowerCase().indexOf(q.toLowerCase()) !== -1 &&
            item.maPartner === partnerID) ||
          (item.diaChi.toLowerCase().indexOf(q.toLowerCase()) !== -1 &&
            item.maPartner === partnerID)
        );
      });
      return filter;
    }
    return getAll;
  }

  async getOneById(id: string): Promise<Lessor> {
    try {
      const lessor = await this.lessorRepository.findOneOrFail({
        relations,
        where: { maBct: id },
      });
      return lessor;
    } catch (err) {
      throw err;
    }
  }

  async create(
    createLessorDto: CreateLessorDto,
    hinhAnhBcts: Array<Express.Multer.File>,
  ): Promise<Lessor> {
    try {
      // TypeStay
      const typeStayBody = createLessorDto.maLuuTru;
      const typeStay = await this.typeStayRepository.findOneOrFail(
        typeStayBody,
      );
      const newLessor = this.lessorRepository.create(createLessorDto);
      newLessor.giaTrungBinh = 0;
      newLessor.soSao = 0;
      newLessor.luotDanhGia = 0;
      newLessor.diemTienLoi = 0;
      newLessor.maBct = `BCT${shortid.generate()}`;
      newLessor.maLoaiLuuTru = typeStay;
      //Convenient
      const convenient = await this.lessorCovenientRepository.find();
      const addConvenient = convenient.map((item) => {
        item.benChoThues = [newLessor];
        return item;
      });
      newLessor.tienNghiBenChoThues = addConvenient;
      await this.lessorRepository.save(newLessor);
      //Images
      const newLessorImage = hinhAnhBcts.map((item) => item.filename);
      for (let i = 0; i < newLessorImage.length; i++) {
        const newImage = this.lessorImagesRepository.create({
          maHinhAnhBct: `HABCT${shortid.generate()}`,
          urlImageBct: newLessorImage[i].toString(),
        });
        newImage.maBct = newLessor;
        await this.lessorImagesRepository.save(newImage);
      }
      const findAndReturn = await this.lessorRepository.findOneOrFail({
        relations,
        where: { maBct: newLessor.maBct },
      });
      return findAndReturn;
    } catch (err) {
      throw err;
    }
  }

  async update(
    id: string,
    updateLessorDto: UpdateLessorDto,
    hinhAnhBcts: Array<Express.Multer.File>,
  ): Promise<Lessor> {
    try {
      const updateLessor = await this.lessorRepository.findOneOrFail(id);
      //TypeStay update
      const getTypeStay = updateLessorDto.maLuuTru;
      const findTypeStay = await this.typeStayRepository.findOneOrFail(
        getTypeStay,
      );
      updateLessor.maLoaiLuuTru = findTypeStay;
      await this.lessorRepository.save({
        ...updateLessor,
        tenBct: updateLessorDto.tenBct,
        diaChi: updateLessorDto.diaChi,
        soSao: updateLessorDto.soSao,
        luotDanhGia: updateLessorDto.luotDanhGia,
        moTa: updateLessorDto.moTa,
        diemTienLoi: updateLessorDto.diemTienLoi,
      });
      //Images update
      // Delete all Images
      await this.lessorImagesRepository.delete({ maBct: { maBct: id } });
      //Add new Images
      const getImages = hinhAnhBcts.map((item) => item.filename);
      for (let i = 0; i < getImages.length; i++) {
        const newImage = this.lessorImagesRepository.create({
          maHinhAnhBct: `HABCT${shortid.generate()}`,
          urlImageBct: getImages[i].toString(),
        });
        newImage.maBct = updateLessor;
        await this.lessorImagesRepository.save(newImage);
      }
      const findAndReturn = await this.lessorRepository.findOneOrFail({
        relations,
        where: { maBct: id },
      });
      return findAndReturn;
    } catch (err) {
      throw err;
    }
  }

  async remove(id: string): Promise<Lessor> {
    //findBCT then delete from table TienNghiBenChoThue
    // const thisLessor = await this.lessorRepository.findOneOrFail(id);
    try {
      await this.lessorCovenientRepository
        .createQueryBuilder('TienNghiBenChoThue')
        .delete()
        .from('BenChoThue_TienNghiBenChoThue')
        .where('MaBCT = :MaBCT', { MaBCT: id })
        .execute();
      //delete from images
      await this.lessorImagesRepository.delete({ maBct: { maBct: id } });
      //delete lessor
      const thisLessor = await this.lessorRepository.findOneOrFail(id);
      return this.lessorRepository.remove(thisLessor);
    } catch (err) {
      throw err;
    }
  }
  async updateAveragePrice(id: string) {
    try {
      const updateLessor = await this.lessorRepository.findOneOrFail(id);
      const listApartment = await this.apartmentRepository.find({
        where: { maBct: id },
      });
      const total = listApartment.reduce((a, b) => a + b.gia, 0);
      const average = total / listApartment.length;
      await this.lessorRepository.save({
        ...updateLessor,
        giaTrungBinh: listApartment.length ? Math.round(average) : 0,
      });
      const result = await this.lessorRepository.findOneOrFail({
        relations,
        where: { maBct: id },
      });
      return result;
    } catch (err) {
      throw err;
    }
  }
}
