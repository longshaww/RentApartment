import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class GetOneApartmentDto {
  @ApiProperty()
  maCanHo: string;
  @ApiProperty()
  maBct: string;
  @ApiProperty()
  maLoaiLuuTru: string;
}
