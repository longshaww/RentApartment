import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  NotFoundException,
  ParseIntPipe,
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

@ApiTags('Apartment')
@Controller('apartment')
export class ApartmentController {
  constructor(private apartmentsService: ApartmentService) {}

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
    const handleParam = id.split('-');
    const obj = {
      MaCanHo: handleParam[0],
      MaBCT: handleParam[1],
    };
    const apartment = this.apartmentsService.getOneById(obj);
    if (!apartment) {
      throw new NotFoundException();
    }
    return apartment;
  }
}
