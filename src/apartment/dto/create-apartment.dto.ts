import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateApartmentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  maBct: string;

  @IsString()
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

  @IsString()
  @IsOptional()
  @ApiProperty()
  moTa: string | null;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  thongTinGiuong: string;
}
