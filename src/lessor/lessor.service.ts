import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BenChoThue as Lessor } from '../../output/entities/BenChoThue';
import { Repository } from 'typeorm';
import { GetOneLessorDto } from './dto/getOne-lessor.dto';
import { LessorRelations as relations } from 'src/relations/relations';

@Injectable()
export class LessorService {
  constructor(
    @InjectRepository(Lessor)
    private lessorRepository: Repository<Lessor>,
  ) {}

  getAll(tenBct: string): Promise<Lessor[]> {
    if (tenBct) {
      return this.lessorRepository.find({
        relations,
        where: {
          tenBct: tenBct,
        },
      });
    }
    return this.lessorRepository.find({
      relations,
    }); // SELECT * FROM lessor
  }

  getOneById(id: GetOneLessorDto): Promise<Lessor> {
    try {
      const lessor = this.lessorRepository.findOneOrFail(id); // SELECT * FROM lessor WHERE lessor.id = id
      return lessor;
    } catch (err) {
      throw err;
    }
  }

  // createLessor(createLessorDto: CreateLessorDto): Promise<BenChoThue> {
  //   const newLessor = this.lessorRepository.create(createLessorDto); // Insert
  //   return this.lessorRepository.save(newLessor);
  // }

  // async updateLessor(
  //   id: string,
  //   updateLessorDto: UpdateLessorDto,
  // ): Promise<BenChoThue> {
  //   let updateLessor = await this.getOneById(id);
  //   updateLessor.nameLessor = updateLessorDto.nameLessor;
  //   return this.lessorRepository.save(updateLessor);
  // }

  // async deleteLessor(id: string): Promise<BenChoThue> {
  //   const deleteLessor = await this.getOneById(id);
  //   return this.lessorRepository.remove(deleteLessor); // Delete
  // }

  // customQuery(name: string): any {
  //   return this.lessorRepository
  //     .createQueryBuilder('lessor')
  //     .select('nameLessor')
  //     .where('name = :name', { name })
  //     .getOne();
  // }
}
