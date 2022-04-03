import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ChiTietDatPhong } from './ChiTietDatPhong';
import { BenChoThue } from './BenChoThue';
import { DanhSachTinhNang } from './DanhSachTinhNang';
import { HinhAnhCanHo } from './HinhAnhCanHo';
import { TienNghiCanHo } from './TienNghiCanHo';

@Index('PK__DanhSach__7D1DD97D527A67C8', ['maCanHo', 'maBct', 'maLoaiLuuTru'], {
  unique: true,
})
@Entity('DanhSachCanHo', { schema: 'dbo' })
export class DanhSachCanHo {
  @Column('nvarchar', { primary: true, name: 'MaCanHo', length: 255 })
  maCanHo: string;

  @Column('nvarchar', { primary: true, name: 'MaBCT', length: 255 })
  maBct: string;

  @Column('nvarchar', { primary: true, name: 'MaLoaiLuuTru', length: 255 })
  maLoaiLuuTru: string;

  @Column('nvarchar', { name: 'TenCanHo', nullable: true, length: 255 })
  tenCanHo: string | null;

  @Column('nvarchar', { name: 'DienTich', nullable: true, length: 255 })
  dienTich: string | null;

  @Column('float', { name: 'Gia', nullable: true, precision: 53 })
  gia: number | null;

  @Column('int', { name: 'SoLuong', nullable: true })
  soLuong: number | null;

  @Column('text', { name: 'MoTa', nullable: true })
  moTa: string | null;

  @OneToMany(
    () => ChiTietDatPhong,
    (chiTietDatPhong) => chiTietDatPhong.danhSachCanHo,
  )
  chiTietDatPhongs: ChiTietDatPhong[];

  @ManyToOne(() => BenChoThue, (benChoThue) => benChoThue.danhSachCanHos)
  @JoinColumn([
    { name: 'MaBCT', referencedColumnName: 'maBct' },
    { name: 'MaLoaiLuuTru', referencedColumnName: 'maLoaiLuuTru' },
  ])
  benChoThue: BenChoThue;

  @OneToMany(
    () => DanhSachTinhNang,
    (danhSachTinhNang) => danhSachTinhNang.danhSachCanHo,
  )
  danhSachTinhNangs: DanhSachTinhNang[];

  @OneToMany(() => HinhAnhCanHo, (hinhAnhCanHo) => hinhAnhCanHo.danhSachCanHo)
  hinhAnhCanHos: HinhAnhCanHo[];

  @OneToMany(
    () => TienNghiCanHo,
    (tienNghiCanHo) => tienNghiCanHo.danhSachCanHo,
  )
  tienNghiCanHos: TienNghiCanHo[];
}
