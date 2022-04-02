import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ChiTietDatPhong } from "./ChiTietDatPhong";
import { DanhSachTinhNang } from "./DanhSachTinhNang";
import { HinhAnh } from "./HinhAnh";
import { TienNghi } from "./TienNghi";
import { BenChoThue } from "./BenChoThue";

@Index("PK__DanhSach__27C693C4185C3CAF", ["maCanHo", "maBct", "maLoaiCanHo"], {
  unique: true,
})
@Entity("DanhSachCanHo", { schema: "dbo" })
export class DanhSachCanHo {
  @Column("nvarchar", { primary: true, name: "MaCanHo", length: 20 })
  maCanHo: string;

  @Column("nvarchar", { primary: true, name: "MaBCT", length: 20 })
  maBct: string;

  @Column("nvarchar", { primary: true, name: "MaLoaiCanHo", length: 20 })
  maLoaiCanHo: string;

  @Column("nvarchar", { name: "TenCanHo", nullable: true, length: 20 })
  tenCanHo: string | null;

  @Column("nvarchar", { name: "DienTich", nullable: true, length: 20 })
  dienTich: string | null;

  @Column("float", { name: "Gia", nullable: true, precision: 53 })
  gia: number | null;

  @Column("int", { name: "SoLuong", nullable: true })
  soLuong: number | null;

  @Column("nvarchar", { name: "MoTa", nullable: true, length: 255 })
  moTa: string | null;

  @OneToMany(
    () => ChiTietDatPhong,
    (chiTietDatPhong) => chiTietDatPhong.danhSachCanHo
  )
  chiTietDatPhongs: ChiTietDatPhong[];

  @ManyToOne(
    () => DanhSachTinhNang,
    (danhSachTinhNang) => danhSachTinhNang.danhSachCanHos
  )
  @JoinColumn([{ name: "MaTinhNang", referencedColumnName: "maTinhNang" }])
  maTinhNang: DanhSachTinhNang;

  @ManyToOne(() => HinhAnh, (hinhAnh) => hinhAnh.danhSachCanHos)
  @JoinColumn([
    { name: "MaHinhAnh", referencedColumnName: "maHinhAnh" },
    { name: "MaLoaiHinhAnh", referencedColumnName: "maLoaiHinhAnh" },
  ])
  hinhAnh: HinhAnh;

  @ManyToOne(() => TienNghi, (tienNghi) => tienNghi.danhSachCanHos)
  @JoinColumn([
    { name: "MaTienNghi", referencedColumnName: "maTienNghi" },
    { name: "MaLoaiTienNghi", referencedColumnName: "maLoaiTienNghi" },
  ])
  tienNghi: TienNghi;

  @ManyToOne(() => BenChoThue, (benChoThue) => benChoThue.danhSachCanHos)
  @JoinColumn([
    { name: "MaBCT", referencedColumnName: "maBct" },
    { name: "MaLoaiCanHo", referencedColumnName: "maLoaiCanHo" },
  ])
  benChoThue: BenChoThue;
}
