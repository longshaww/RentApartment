import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { DanhSachCanHo } from "./DanhSachCanHo";
import { DanhSachDatPhong } from "./DanhSachDatPhong";

@Index(
  "PK__ChiTietD__3138C4D6AA8B67AE",
  ["maDatPhong", "maCanHo", "maBct", "maLoaiCanHo"],
  { unique: true }
)
@Entity("ChiTietDatPhong", { schema: "dbo" })
export class ChiTietDatPhong {
  @Column("nvarchar", { primary: true, name: "MaDatPhong", length: 20 })
  maDatPhong: string;

  @Column("nvarchar", { primary: true, name: "MaCanHo", length: 20 })
  maCanHo: string;

  @Column("nvarchar", { primary: true, name: "MaBCT", length: 20 })
  maBct: string;

  @Column("nvarchar", { primary: true, name: "MaLoaiCanHo", length: 20 })
  maLoaiCanHo: string;

  @Column("nvarchar", { name: "TenKH", nullable: true, length: 50 })
  tenKh: string | null;

  @Column("nvarchar", { name: "EmailKH", nullable: true, length: 50 })
  emailKh: string | null;

  @Column("nvarchar", { name: "SDT", nullable: true, length: 50 })
  sdt: string | null;

  @Column("nvarchar", { name: "MoTaYeuCau", nullable: true, length: 50 })
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
    { name: "MaLoaiCanHo", referencedColumnName: "maLoaiCanHo" },
  ])
  danhSachCanHo: DanhSachCanHo;

  @ManyToOne(
    () => DanhSachDatPhong,
    (danhSachDatPhong) => danhSachDatPhong.chiTietDatPhongs
  )
  @JoinColumn([{ name: "MaDatPhong", referencedColumnName: "maDatPhong" }])
  maDatPhong2: DanhSachDatPhong;
}
