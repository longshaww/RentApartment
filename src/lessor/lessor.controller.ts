import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query,
  UploadedFiles,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { LessorService } from './lessor.service';
import { CreateLessorDto } from './dto/create-lessor.dto';
import { UpdateLessorDto } from './dto/update-lessor.dto';
import { BenChoThue as Lessor } from '../../output/entities/BenChoThue';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';

import { AnyFilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Lessor')
@Controller('lessor')
export class LessorController {
  constructor(private readonly lessorService: LessorService) {}

  @ApiQuery({ name: 'tenBct', required: false })
  @ApiQuery({ name: 'ngayCheckIn', required: false })
  @ApiQuery({ name: 'ngayCheckOut', required: false })
  @ApiOkResponse({ type: Lessor, isArray: true })
  @ApiNotFoundResponse()
  @Get()
  async getAll(
    @Query('tenBct') tenBct?: string,
    @Query('ngayCheckIn') ngayCheckIn?: Date,
    @Query('ngayCheckOut') ngayCheckOut?: Date,
  ): Promise<Lessor[]> {
    const lessors = this.lessorService.getAll(
      tenBct,
      ngayCheckIn,
      ngayCheckOut,
    );
    if (!lessors) {
      throw new NotFoundException();
    }
    return lessors;
  }

  @Get(':id')
  @ApiOkResponse({ type: Lessor })
  @ApiNotFoundResponse()
  async getOneById(@Param('id') id: string): Promise<Lessor> {
    const lessor = this.lessorService.getOneById(id);
    if (!lessor) {
      throw new NotFoundException();
    }
    return lessor;
  }

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async create(
    @Body() createLessorDto: CreateLessorDto,
    @UploadedFiles() hinhAnhBcts: Array<Express.Multer.File>,
    @Res() res: Response,
  ) {
    if (!createLessorDto) {
      res
        .status(400)
        .json({ success: false, message: 'Cannot post without body' });
    }
    try {
      const newLessor = await this.lessorService.create(
        createLessorDto,
        hinhAnhBcts,
      );
      res.status(201).json({ success: true, body: newLessor });
    } catch (err) {
      res.status(400).json({ success: false, message: err });
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLessorDto: UpdateLessorDto,
    hinhAnhBcts: Array<Express.Multer.File>,
  ) {
    return this.lessorService.update(id, updateLessorDto, hinhAnhBcts);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessorService.remove(id);
  }
}
