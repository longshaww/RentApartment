import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LessorService } from './lessor.service';
import { CreateLessorDto } from './dto/create-lessor.dto';
import { UpdateLessorDto } from './dto/update-lessor.dto';
import { Lessor } from 'src/lessor.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Lessor')
@Controller('lessor')
export class LessorController {
  constructor(private readonly lessorService: LessorService) {}

  @Get()
  async getHello(@Body() body: CreateLessorDto): Promise<Lessor[]> {
    // body = {
    //   nameLessor: 'Viettel',
    //   addressLessor: '219 Pham The Hien',
    //   priceAverage: 200,
    //   starCount: 4,
    //   rateCount: 50,
    //   description: 'Hello world',
    // };
    return this.lessorService.getAll();
  }
  // @Post()
  // create(@Body() createLessorDto: CreateLessorDto) {
  //   return this.lessorService.create(createLessorDto);
  // }

  // @Get()
  // findAll() {
  //   return this.lessorService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.lessorService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLessorDto: UpdateLessorDto) {
  //   return this.lessorService.update(+id, updateLessorDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.lessorService.remove(+id);
  // }
}
