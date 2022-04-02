import { Module } from '@nestjs/common';
import { LessorService } from './lessor.service';
import { LessorController } from './lessor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lessor } from 'src/lessor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lessor])],
  controllers: [LessorController],
  providers: [LessorService],
})
export class LessorModule {}
