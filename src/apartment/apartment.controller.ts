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

function handleParam(id) {
  const handleParam = id.split('-');
  const obj = {
    maCanHo: handleParam[0],
    maBct: handleParam[1],
  };
  return obj;
}

@ApiTags('Apartment')
@Controller('apartment')
export class ApartmentController {
  constructor(private apartmentsService: ApartmentService) {}

  @Post()
  @ApiCreatedResponse({ type: Apartment })
  create(@Body() createApartmentDto: CreateApartmentDto) {
    return this.apartmentsService.create(createApartmentDto);
  }

  @ApiQuery({ name: 'tenCanHo', required: false })
  @ApiOkResponse({ type: Apartment, isArray: true })
  @ApiNotFoundResponse()
  @Get()
  async getAll(@Query('tenCanHo') tenCanHo?: string): Promise<Apartment[]> {
    // Advanced Search
    const apartments = this.apartmentsService.getAll(tenCanHo);
    if (!apartments) {
      throw new NotFoundException();
    }
    return apartments;
  }

  @Get(':id')
  @ApiOkResponse({ type: Apartment })
  @ApiNotFoundResponse()
  async getOneById(@Param('id') id: string): Promise<Apartment> {
    const param = handleParam(id);
    const apartment = this.apartmentsService.getOneById(param);
    if (!apartment) {
      throw new NotFoundException();
    }
    return apartment;
  }

  @Patch(':id')
  @ApiOkResponse({ type: Apartment })
  update(
    @Param('id') id: string,
    @Body() updateApartmentDto: UpdateApartmentDTO,
  ) {
    const param = handleParam(id);
    if (!Param || !Body) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    return this.apartmentsService.update(param, updateApartmentDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Apartment })
  remove(@Param('id') id: string) {
    if (!Param) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    const param = handleParam(id);
    return this.apartmentsService.remove(param);
  }
}
