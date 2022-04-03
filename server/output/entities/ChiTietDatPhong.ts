import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { DanhSachCanHo } from "./DanhSachCanHo";
import { DanhSachDatPhong } from "./DanhSachDatPhong";

@Index(
  "PK__ChiTietD__A495707D3442063D",
  ["maDatPhong", "maCanHo", "maBct", "maLoaiLuuTru"],
  { unique: true }
)
@Entity("ChiTietDatPhong", { schema: "dbo" })
export class ChiTietDatPhong {
  @Column("nvarchar", { primary: true, name: "MaDatPhong", length: 255 })
  maDatPhong: string;

  @Column("nvarchar", { primary: true, name: "MaCanHo", length: 255 })
  maCanHo: string;

  @Column("nvarchar", { primary: true, name: "MaBCT", length: 255 })
  maBct: string;

  @Column("nvarchar", { primary: true, name: "MaLoaiLuuTru", length: 255 })
  maLoaiLuuTru: string;

  @Column("nvarchar", { name: "TenKH", nullable: true, length: 255 })
  tenKh: string | null;

  @Column("nvarchar", { name: "EmailKH", nullable: true, length: 255 })
  emailKh: string | null;

  @Column("nvarchar", { name: "SDT", nullable: true, length: 255 })
  sdt: string | null;

  @Column("nvarchar", { name: "MoTaYeuCau", nullable: true, length: 255 })
  moTaYeuCau: string | null;

  @Column("datetime", { name: "ThoiGianNhan", nullable: true })
  thoiGianNhan: Date | null;

  @Column("datetime", { name: "ThoiGianTraPhong", nullable: true })
  thoiGianTraPhong: Date | null;

  @ManyToOne(
    () => DanhSachCanHo,
    (danhSachCanHo) => danhSachCanHo.chiTietDatPhongs
  )
  @JoinColumn([
    { name: "MaCanHo", referencedColumnName: "maCanHo" },
    { name: "MaBCT", referencedColumnName: "maBct" },
    { name: "MaLoaiLuuTru", referencedColumnName: "maLoaiLuuTru" },
  ])
  danhSachCanHo: DanhSachCanHo;

  @ManyToOne(
    () => DanhSachDatPhong,
    (danhSachDatPhong) => danhSachDatPhong.chiTietDatPhongs
  )
  @JoinColumn([{ name: "MaDatPhong", referencedColumnName: "maDatPhong" }])
  maDatPhong2: DanhSachDatPhong;
}
