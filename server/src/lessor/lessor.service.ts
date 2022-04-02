import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lessor } from 'src/lessor.entity';
import { Repository } from 'typeorm';
import { CreateLessorDto } from './dto/create-lessor.dto';
import { UpdateLessorDto } from './dto/update-lessor.dto';

@Injectable()
export class LessorService {
  constructor(
    @InjectRepository(Lessor) private lessorRepository: Repository<Lessor>,
  ) {}

  getAll(): Promise<Lessor[]> {
    return this.lessorRepository.find(); // SELECT * FROM lessor
  }

  getOneById(id: string): Promise<Lessor> {
    try {
      const lessor = this.lessorRepository.findOneOrFail(id); // SELECT * FROM lessor WHERE lessor.id = id
      return lessor;
    } catch (err) {
      throw err;
    }
  }

  createLessor(createLessorDto: CreateLessorDto): Promise<Lessor> {
    const newLessor = this.lessorRepository.create(createLessorDto); // Insert
    return this.lessorRepository.save(newLessor);
  }

  async updateLessor(
    id: string,
    updateLessorDto: UpdateLessorDto,
  ): Promise<Lessor> {
    let updateLessor = await this.getOneById(id);
    updateLessor.nameLessor = updateLessorDto.nameLessor;
    return this.lessorRepository.save(updateLessor);
  }

  async deleteLessor(id: string): Promise<Lessor> {
    const deleteLessor = await this.getOneById(id);
    return this.lessorRepository.remove(deleteLessor); // Delete
  }

  customQuery(name: string): any {
    return this.lessorRepository
      .createQueryBuilder('lessor')
      .select('nameLessor')
      .where('name = :name', { name })
      .getOne();
  }
}
