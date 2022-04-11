import { Injectable } from '@nestjs/common';
import { CanHo as Apartment } from '../../output/entities/CanHo';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApartmentRelations as relations } from '../relations/relations';
import { GetOneApartmentDto } from './dto/getOne-apartment.dto';

@Injectable()
export class ApartmentService {
  constructor(
    @InjectRepository(Apartment)
    private apartmentRepository: Repository<Apartment>,
  ) {}

  getAll(tenCanHo: string): Promise<Apartment[]> {
    if (tenCanHo) {
      return this.apartmentRepository.find({
        relations,
        where: {
          tenCanHo: tenCanHo,
        },
      });
    }
    return this.apartmentRepository.find({
      relations,
    });
  }

  getOneById(id: GetOneApartmentDto): Promise<Apartment> {
    try {
      const maBct = id.MaBCT;
      const maCanHo = id.MaCanHo;

      const apartment = this.apartmentRepository.findOne({
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
}
