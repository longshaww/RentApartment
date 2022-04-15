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

@ApiTags('Lessor')
@Controller('lessor')
export class LessorController {
  constructor(private readonly lessorService: LessorService) {}

  @ApiQuery({ name: 'tenBct', required: false })
  @ApiOkResponse({ type: Lessor, isArray: true })
  @ApiNotFoundResponse()
  @Get()
  async getAll(@Query('tenBct') tenBct?: string): Promise<Lessor[]> {
    const lessors = this.lessorService.getAll(tenBct);
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
  create(@Body() createLessorDto: CreateLessorDto) {
    return this.lessorService.create(createLessorDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessorDto: UpdateLessorDto) {
    return this.lessorService.update(id, updateLessorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessorService.remove(id);
  }
}
