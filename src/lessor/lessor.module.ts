import { Module } from '@nestjs/common';
import { LessorService } from './lessor.service';
import { LessorController } from './lessor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BenChoThue as Lessor } from '../entities/BenChoThue';
import { HinhAnhBct as LessorImages } from '../entities/HinhAnhBct';
import { LoaILuuTru as TypeStay } from '../entities/LoaILuuTru';
import { TienNghiBenChoThue as LessorCovenient } from '../entities/TienNghiBenChoThue';
import { CanHo as Apartment } from '../entities/CanHo';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Lessor,
      LessorImages,
      TypeStay,
      LessorCovenient,
      Apartment,
    ]),
    MulterModule.register({
      dest: join(__dirname, '../..', 'upload'),
    }),
  ],
  controllers: [LessorController],
  providers: [LessorService],
})
export class LessorModule {}
