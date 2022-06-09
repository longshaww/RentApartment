import { Module } from '@nestjs/common';
import { BookedDateService } from './booked-date.service';
import { BookedDateController } from './booked-date.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NgayDaDat as BookedDate } from '../entities/NgayDaDat';

@Module({
  imports: [TypeOrmModule.forFeature([BookedDate])],
  controllers: [BookedDateController],
  providers: [BookedDateService],
})
export class BookedDateModule {}
