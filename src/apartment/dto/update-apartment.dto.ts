import { ApiProperty } from '@nestjs/swagger';
import { HinhAnhCanHo } from 'output/entities/HinhAnhCanHo';
import { OneToMany } from 'typeorm';

export class UpdateApartmentDTO {
  @ApiProperty()
  tenCanHo: string;
  @ApiProperty()
  dienTich: string;
  @ApiProperty()
  gia: number;
  @ApiProperty()
  soLuongKhach: number;
  @ApiProperty()
  soLuongCon: number;

  @ApiProperty()
  moTa: string | null;
}
