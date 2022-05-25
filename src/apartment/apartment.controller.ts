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
import { CanHo as Apartment } from '../../output/entities/CanHo';
import { UpdateApartmentDTO } from './dto/update-apartment.dto';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Apartment')
@Controller('apartment')
export class ApartmentController {
  constructor(private apartmentsService: ApartmentService) {}

  @UseInterceptors(AnyFilesInterceptor())
  @Post()
  @ApiCreatedResponse({ type: Apartment })
  @ApiBadRequestResponse()
  create(
    @Body() createApartmentDto: CreateApartmentDto,
    @UploadedFiles() hinhAnhCanHos: Array<Express.Multer.File>,
  ) {
    return this.apartmentsService.create(createApartmentDto, hinhAnhCanHos);
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

  @Patch(':id')
  @ApiOkResponse({ type: Apartment })
  @ApiBadRequestResponse()
  update(
    @Param('id') id: string,
    @Body() updateApartmentDto: UpdateApartmentDTO,
  ) {
    if (!Param || !Body) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    return this.apartmentsService.update(id, updateApartmentDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Apartment })
  @ApiBadRequestResponse()
  remove(@Param('id') id: string) {
    if (!Param) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    return this.apartmentsService.remove(id);
  }
}
