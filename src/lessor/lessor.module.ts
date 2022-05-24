import { Module } from '@nestjs/common';
import { LessorService } from './lessor.service';
import { LessorController } from './lessor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BenChoThue as Lessor } from '../../output/entities/BenChoThue';
import { HinhAnhBct as LessorImages } from '../../output/entities/HinhAnhBct';
import { LoaILuuTru as TypeStay } from '../../output/entities/LoaILuuTru';
import { TienNghiBenChoThue as LessorCovenient } from '../../output/entities/TienNghiBenChoThue';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lessor, LessorImages, TypeStay, LessorCovenient]),
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [LessorController],
  providers: [LessorService],
})
export class LessorModule {}
