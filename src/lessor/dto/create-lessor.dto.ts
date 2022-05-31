import { ApiProperty } from '@nestjs/swagger';
import { HinhAnhBct } from 'output/entities/HinhAnhBct';
import { TienNghiBenChoThue } from 'output/entities/TienNghiBenChoThue';

export class CreateLessorDto {
  @ApiProperty()
  tenBct: string;
  @ApiProperty()
  diaChi: string;
  @ApiProperty()
  giaTrungBinh: number;
  @ApiProperty()
  soSao: number;
  @ApiProperty()
  luotDanhGia: number;
  @ApiProperty()
  moTa: string | null;
  tienNghiBenChoThues: TienNghiBenChoThue[];
  @ApiProperty()
  maLuuTru: string;
  @ApiProperty()
  diemTienLoi: number;
  @ApiProperty()
  maPartner: string;
}
