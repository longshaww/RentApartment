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
import { PhieuDatPhong as Bill } from '../entities/PhieuDatPhong';
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

  @ApiQuery({ name: 'maBct', required: false })
  @Get()
  async findAll(@Res() res: Response, @Query('maBct') maBct?: string) {
    const bills = await this.billService.findAll(maBct);
    res.status(200).json(bills);
  }

  @ApiQuery({ name: 'maBct', required: true })
  @Get('lessor')
  async findAllWithChart(@Res() res: Response, @Query('maBct') maBct: string) {
    const bills = await this.billService.findAllWithChart(maBct);
    if (!bills) {
      res.status(404).json({ success: false, message: SOMETHING_WRONG });
    }
    try {
      res.status(200).json({ ...bills, success: true });
    } catch (err) {
      res.status(400).json({ success: false, message: err });
    }
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
    res.status(200).json({ ...bills, success: true });
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
      res.status(404).json({ success: false, message: err });
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
