import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { TienNghiBenChoThue } from 'output/entities/TienNghiBenChoThue';

export class CreateLessorDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  tenBct: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  diaChi: string;

  @ApiProperty()
  giaTrungBinh: number;

  @ApiProperty()
  soSao: number;

  @ApiProperty()
  luotDanhGia: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  moTa: string | null;

  tienNghiBenChoThues: TienNghiBenChoThue[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  maLuuTru: string;

  @ApiProperty()
  diemTienLoi: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  maPartner: string;
}
