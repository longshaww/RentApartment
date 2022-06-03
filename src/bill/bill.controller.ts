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
import {
  CANNOT_POST_WITHOUT_BODY,
  NOT_FOUND,
  SOMETHING_WRONG,
} from 'src/constant/constant';

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
  async create(@Body() createBillDto: CreateBillDto, @Res() res: Response) {
    const bill = await this.billService.create(createBillDto);
    if (!bill) {
      return res.status(400).json({ success: false, message: SOMETHING_WRONG });
    }
    res.status(200).json({ success: true, body: bill });
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
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const bill = await this.billService.findOne(id);
    if (!bill) {
      res.status(404).json({ success: false, message: NOT_FOUND });
    }
    try {
      res.status(200).json({ success: true, body: bill });
    } catch (err) {
      res.status(404).json({ success: false, message: NOT_FOUND });
    }
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
