import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Query,
} from '@nestjs/common';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { PhieuDatPhong as Bill } from '../../output/entities/PhieuDatPhong';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreatePaymentDto } from './dto/creat-payment.dto';
import { Response } from 'express';

@ApiTags('Bill')
@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const bills = await this.billService.findAll();
    res.status(200).json(bills);
  }

  @Post()
  create(@Body() createBillDto: CreateBillDto) {
    return this.billService.create(createBillDto);
  }

  @Post('charge')
  charge(@Body() createPaymentDto: CreatePaymentDto) {
    return this.billService.charge(createPaymentDto);
  }

  @Get('chart')
  async chart(@Res() res: Response) {
    const bills = await this.billService.chart();
    res.status(200).json(bills);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBillDto: UpdateBillDto) {
  //   return this.billService.update(+id, updateBillDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billService.remove(id);
  }
}
