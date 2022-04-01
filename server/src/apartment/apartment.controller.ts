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
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { Apartment } from './entities/apartment.entity';

@ApiTags('Apartment')
@Controller('apartment')
export class ApartmentController {
  constructor(private apartmentsService: ApartmentService) {}

  @ApiOkResponse({ type: Apartment, isArray: true })
  @ApiQuery({ name: 'name', required: false })
  @Get()
  getApartments(@Query('name') name?: string): Apartment[] {
    return this.apartmentsService.findAll(name);
  }

  @ApiNotFoundResponse()
  @ApiOkResponse({ type: Apartment })
  @Get(':id')
  getApartmentById(@Param('id', ParseIntPipe) id: number): Apartment {
    const apartment = this.apartmentsService.findById(id);
    if (!apartment) {
      throw new NotFoundException();
      //BadRequestException
      //InternalServerErrorException
    }
    return apartment;
  }

  @ApiCreatedResponse({ type: Apartment })
  @Post()
  createApartment(@Body() body: CreateApartmentDto): Apartment {
    return this.apartmentsService.createApartment(body);
  }
}
