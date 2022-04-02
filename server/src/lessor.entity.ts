import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Lessor {
  @PrimaryGeneratedColumn('uuid')
  idLessor: string;
  @Column()
  nameLessor: string;
  @Column()
  addressLessor: string;
  @Column()
  priceAverage: number;
  @Column()
  starCount: number;
  @Column()
  rateCount: number;
  @Column()
  description: string;
}
