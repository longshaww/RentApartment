import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ChiTietDatPhong } from './ChiTietDatPhong';
import { CanHo } from './CanHo';
import { KhachHang } from './KhachHang';

@Entity('PhieuDatPhong', { schema: 'dbo' })
export class PhieuDatPhong {
  @Column('nvarchar', { primary: true, name: 'MaDatPhong', length: 255 })
  maDatPhong: string;

  @Column('nvarchar', { name: 'Thue', length: 255 })
  thue: string;

  @Column('float', { name: 'TongTien', precision: 53 })
  tongTien: number;

  @Column('datetime', { name: 'NgayTao' })
  ngayTao: Date;

  @Column('bit', { name: 'TrangThai' })
  trangThai: boolean;

  @Column('nvarchar', { primary: true, name: 'MaCanHo', length: 255 })
  maCanHo: string;

  @Column('nvarchar', { primary: true, name: 'MaKhachHang', length: 255 })
  maKhachHang: string;

  @Column('nvarchar', { primary: true, name: 'MaBCT', length: 255 })
  maBct: string;

  @OneToMany(
    () => ChiTietDatPhong,
    (chiTietDatPhong) => chiTietDatPhong.phieuDatPhong,
  )
  chiTietDatPhongs: ChiTietDatPhong[];

  @ManyToOne(() => CanHo, (canHo) => canHo.phieuDatPhongs)
  @JoinColumn([
    { name: 'MaCanHo', referencedColumnName: 'maCanHo' },
    { name: 'MaBCT', referencedColumnName: 'maBct' },
  ])
  canHo: CanHo;

  @ManyToOne(() => KhachHang, (khachHang) => khachHang.phieuDatPhongs)
  @JoinColumn([{ name: 'MaKhachHang', referencedColumnName: 'maKhachHang' }])
  maKhachHang2: KhachHang;
}
