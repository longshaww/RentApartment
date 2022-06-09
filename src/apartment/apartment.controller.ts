import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  NotFoundException,
  ParseIntPipe,
  Patch,
  HttpException,
  HttpStatus,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Res,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';
import { ApartmentService } from './apartment.service';
import { CanHo as Apartment } from '../entities/CanHo';
import { UpdateApartmentDTO } from './dto/update-apartment.dto';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import {
  CANNOT_POST_WITHOUT_BODY,
  CANNOT_POST_WITHOUT_ID,
} from '../constant/constant';

@ApiTags('Apartment')
@Controller('apartment')
export class ApartmentController {
  constructor(private apartmentsService: ApartmentService) {}

  @UseInterceptors(AnyFilesInterceptor())
  @Post()
  @ApiCreatedResponse({ type: Apartment })
  @ApiBadRequestResponse()
  async create(
    @Body() createApartmentDto: CreateApartmentDto,
    @UploadedFiles() hinhAnhCanHos: Array<Express.Multer.File>,
    @Res() res: Response,
  ) {
    if (!createApartmentDto) {
      res
        .status(400)
        .json({ success: false, message: CANNOT_POST_WITHOUT_BODY });
    }
    try {
      const newApart = await this.apartmentsService.create(
        createApartmentDto,
        hinhAnhCanHos,
      );
      res.status(201).json({ success: true, body: newApart });
    } catch (err) {
      res.status(400).json({ success: false, message: err });
    }
  }

  @ApiQuery({ name: 'maBct', required: false })
  @ApiOkResponse({ type: Apartment, isArray: true })
  @ApiNotFoundResponse()
  @Get()
  async getAll(@Query('maBct') maBct?: string): Promise<Apartment[]> {
    // Advanced Search
    const apartments = this.apartmentsService.getAll(maBct);
    if (!apartments) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    return apartments;
  }

  @Get(':id')
  @ApiOkResponse({ type: Apartment })
  @ApiNotFoundResponse()
  async getOneById(@Param('id') id: string): Promise<Apartment> {
    const apartment = this.apartmentsService.getOneById(id);
    if (!apartment) {
      throw new NotFoundException();
    }
    return apartment;
  }

  @UseInterceptors(AnyFilesInterceptor())
  @Put(':id')
  @ApiOkResponse({ type: Apartment })
  @ApiBadRequestResponse()
  async update(
    @Param('id') id: string,
    @Body() updateApartmentDto: UpdateApartmentDTO,
    @UploadedFiles() hinhAnhCanHos: Array<Express.Multer.File>,
    @Res() res: Response,
  ) {
    if (!updateApartmentDto) {
      res
        .status(400)
        .json({ success: false, message: CANNOT_POST_WITHOUT_BODY });
    }
    if (!id) {
      res.status(400).json({ success: false, message: CANNOT_POST_WITHOUT_ID });
    }

    try {
      const newApartment = await this.apartmentsService.update(
        id,
        updateApartmentDto,
        hinhAnhCanHos,
      );
      res.status(202).json({ success: true, body: newApartment });
    } catch (err) {
      res.status(400).json({ success: false, message: err });
    }
  }

  @Delete(':id')
  @ApiOkResponse({ type: Apartment })
  @ApiBadRequestResponse()
  async remove(@Param('id') id: string, @Res() res: Response) {
    if (!id) {
      res.status(404).json({ success: false, message: CANNOT_POST_WITHOUT_ID });
    }
    try {
      const deleteApartment = await this.apartmentsService.remove(id);
      res.status(200).json({ success: true, body: deleteApartment });
    } catch (err) {
      res.status(400).json({ success: false, message: err });
    }
  }
}
