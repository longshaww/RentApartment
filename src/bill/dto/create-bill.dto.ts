import { ApiProperty } from '@nestjs/swagger';

export class CreateBillDto {
  maDatPhong: string;
  @ApiProperty()
  thue: string;
  @ApiProperty()
  tongTien: number;
  @ApiProperty()
  ngayTao: Date;
  @ApiProperty()
  trangThai: boolean;
  @ApiProperty()
  maCanHo: string;
  @ApiProperty()
  maBct: string;
  //
  maKhachHang: string;
  @ApiProperty()
  ten: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  sdt: string;
  @ApiProperty()
  yeuCau?: string;
  //
  maChiTietDatPhong: string;
  @ApiProperty()
  tongTienCanHo: number;
  @ApiProperty()
  soLuongCanHo: number;
  @ApiProperty()
  thoiGianNhan: Date;
  @ApiProperty()
  thoiGianTra: Date;
}
