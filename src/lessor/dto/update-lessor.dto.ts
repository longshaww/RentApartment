import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CanHo } from 'output/entities/CanHo';
import { HinhAnhBct } from 'output/entities/HinhAnhBct';
import { LoaILuuTru } from 'output/entities/LoaILuuTru';
import { TienNghiBenChoThue } from 'output/entities/TienNghiBenChoThue';
import { CreateLessorDto } from './create-lessor.dto';

export class UpdateLessorDto extends PartialType(CreateLessorDto) {}
