import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NgayDaDat as BookedDate } from 'src/entities/NgayDaDat';
import { getManager, Repository } from 'typeorm';
import * as moment from 'moment';
import { BookedDateRelation as relations } from 'src/relations/relations';

@Injectable()
export class BookedDateService {
  constructor(
    @InjectRepository(BookedDate)
    private bookedDateRepository: Repository<BookedDate>,
  ) {}

  // create(createBookedDateDto: CreateBookedDateDto) {
  //   return 'This action adds a new bookedDate';
  // }

  async findAll(ngayCheckIn: Date, ngayCheckOut: Date) {
    if (ngayCheckIn && ngayCheckOut) {
      const manager = getManager();
      const dateQuery = await manager.query(
        `SELECT * from NgayDaDat where not (NgayCheckIn <= '${ngayCheckIn}' AND NgayCheckOut >= '${ngayCheckOut}')`,
      );

      dateQuery.map((item: any) => {
        const dateCheckout = moment(item.NgayCheckOut);
        const dateCheckIn = moment(item.NgayCheckIn);
        item.diff = dateCheckout.diff(dateCheckIn, 'days');
        return item;
      });
      return dateQuery;
    }
    const dateQuery = await this.bookedDateRepository.find({ relations });
    dateQuery.map((item: any) => {
      const dateCheckout = moment(item.ngayCheckOut);
      const dateCheckIn = moment(item.ngayCheckIn);
      item.diff = dateCheckout.diff(dateCheckIn, 'days');
      return item;
    });
    return dateQuery;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} bookedDate`;
  // }

  // update(id: number, updateBookedDateDto: UpdateBookedDateDto) {
  //   return `This action updates a #${id} bookedDate`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} bookedDate`;
  // }
}
