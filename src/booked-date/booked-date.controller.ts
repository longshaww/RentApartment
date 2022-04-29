import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { BookedDateService } from './booked-date.service';

@ApiTags('Booked Date')
@Controller('booked-date')
export class BookedDateController {
  constructor(private readonly bookedDateService: BookedDateService) {}

  // @Post()
  // create(@Body() createBookedDateDto: CreateBookedDateDto) {
  //   return this.bookedDateService.create(createBookedDateDto);
  // }

  @ApiQuery({ name: 'ngayCheckIn', required: false })
  @ApiQuery({ name: 'ngayCheckOut', required: false })
  @Get()
  findAll(
    @Query('ngayCheckIn') ngayCheckIn?: Date,
    @Query('ngayCheckOut') ngayCheckOut?: Date,
  ) {
    return this.bookedDateService.findAll(ngayCheckIn, ngayCheckOut);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.bookedDateService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBookedDateDto: UpdateBookedDateDto) {
  //   return this.bookedDateService.update(+id, updateBookedDateDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.bookedDateService.remove(+id);
  // }
}
