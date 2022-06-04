import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBillDto {
  maDatPhong: string;

  @IsNotEmpty()
  @ApiProperty()
  thue: string;

  @IsNotEmpty()
  @ApiProperty()
  tongTien: number;

  @IsNotEmpty()
  @ApiProperty()
  ngayTao: Date;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  trangThai: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  maCanHo: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  maBct: string;
  //
  maKhachHang: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  ten: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  sdt: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  yeuCau?: string;
  //
  maChiTietDatPhong: string;

  @IsNotEmpty()
  @ApiProperty()
  tongTienCanHo: number;

  @IsNotEmpty()
  @ApiProperty()
  soLuongCanHo: number;

  @IsNotEmpty()
  @ApiProperty()
  thoiGianNhan: Date;

  @IsNotEmpty()
  @ApiProperty()
  thoiGianTra: Date;
}
