import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BenChoThue as Lessor } from '../../output/entities/BenChoThue';
import { HinhAnhBct as LessorImages } from '../../output/entities/HinhAnhBct';
import { LoaILuuTru as TypeStay } from '../../output/entities/LoaILuuTru';
import { TienNghiBenChoThue as LessorCovenient } from '../../output/entities/TienNghiBenChoThue';
import { getManager, Repository } from 'typeorm';
import { LessorRelations as relations } from 'src/relations/relations';
import { CreateLessorDto } from './dto/create-lessor.dto';
import { UpdateLessorDto } from './dto/update-lessor.dto';

const shortid = require('shortid');

async function convenientQueryByID(id) {
  const manager = getManager();
  return await manager.query(`
     select TenTienNghiBCT
      from TienNghiBenChoThue
      where EXISTS  (select MaTienNghiBCT,MaBCT from BenChoThue_TienNghiBenChoThue
      where BenChoThue_TienNghiBenChoThue.MaBCT = '${id}')`);
}
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
  ) {}

  async getAll(tenBct: string): Promise<Lessor[]> {
    if (tenBct) {
      return await this.lessorRepository.find({
        relations,
        where: {
          tenBct: tenBct,
        },
      });
    }
    const manager = getManager();
    const convenientQuery = await manager.query(`
    select TenTienNghiBCT
    from TienNghiBenChoThue
    where EXISTS  (select MaTienNghiBCT,MaBCT from BenChoThue_TienNghiBenChoThue)`);
    const selectNameCovenient = convenientQuery.map((item: any) => {
      return item.TenTienNghiBCT;
    });
    const getAll = await this.lessorRepository.find({
      relations,
    });
    const customize = getAll.map((item) => {
      item.tienNghiBCT = selectNameCovenient;
      return item;
    });
    return customize;
  }

  async getOneById(id: string): Promise<Lessor> {
    try {
      const lessor = await this.lessorRepository.findOneOrFail({
        relations,
        where: { maBct: id },
      }); // SELECT * FROM lessor WHERE lessor.id = id

      const convenientQuery = await convenientQueryByID(id);
      lessor.tienNghiBCT = convenientQuery;
      return lessor;
    } catch (err) {
      throw err;
    }
  }

  async create(createLessorDto: CreateLessorDto): Promise<Lessor> {
    try {
      // TypeStay
      const typeStayBody = createLessorDto.maLuuTru;
      const typeStay = await this.typeStayRepository.findOneOrFail(
        typeStayBody,
      );
      const newLessor = this.lessorRepository.create(createLessorDto);
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
      const newLessorImage = createLessorDto.hinhAnh;
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
      const convenientQuery = await convenientQueryByID(findAndReturn.maBct);
      findAndReturn.tienNghiBCT = convenientQuery;
      return findAndReturn;
    } catch (err) {
      throw err;
    }
  }

  async update(id: string, updateLessorDto: UpdateLessorDto): Promise<Lessor> {
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
        giaTrungBinh: updateLessorDto.giaTrungBinh,
        soSao: updateLessorDto.soSao,
        luotDanhGia: updateLessorDto.luotDanhGia,
        moTa: updateLessorDto.moTa,
        diemTienNghi: updateLessorDto.diemTienNghi,
      });
      //Images update
      // Delete all Images
      await this.lessorImagesRepository.delete({ maBct: { maBct: id } });
      //Add new Images
      const getImages = updateLessorDto.hinhAnh;
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
      const convenientQuery = await convenientQueryByID(id);
      findAndReturn.tienNghiBCT = convenientQuery;
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
}
