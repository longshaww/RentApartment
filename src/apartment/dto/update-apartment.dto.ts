import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateApartmentDTO {
  @IsNotEmpty()
  @ApiProperty()
  tenCanHo: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  dienTich: string;

  @IsNotEmpty()
  @ApiProperty()
  gia: number;

  @IsNotEmpty()
  @ApiProperty()
  soLuongKhach: number;

  @ApiProperty()
  soLuongCon: number;

  @ApiProperty()
  hinhAnh: string[];

  @IsOptional()
  @IsString()
  @ApiProperty()
  moTa: string | null;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  thongTinGiuong: string;
}
