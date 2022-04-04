import { Injectable } from '@nestjs/common';
import { DanhSachCanHo as Apartment } from '../../output/entities/DanhSachCanHo';
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
      const lessor = this.apartmentRepository.findOneOrFail(id); // SELECT * FROM lessor WHERE lessor.id = id
      return lessor;
    } catch (err) {
      throw err;
    }
  }
}
