import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { DanhSachCanHo } from "./DanhSachCanHo";
import { LoaiTienNghiCanHo } from "./LoaiTienNghiCanHo";

@Index(
  "PK__TienNghi__0FAF22584EA9D4EC",
  [
    "maTienNghiCanHo",
    "maLoaiTienNghiCanHo",
    "maCanHo",
    "maBct",
    "maLoaiLuuTru",
  ],
  { unique: true }
)
@Entity("TienNghiCanHo", { schema: "dbo" })
export class TienNghiCanHo {
  @Column("nvarchar", { primary: true, name: "MaTienNghiCanHo", length: 255 })
  maTienNghiCanHo: string;

  @Column("nvarchar", { name: "TenTienNghiCanHo", nullable: true, length: 255 })
  tenTienNghiCanHo: string | null;

  @Column("nvarchar", {
    primary: true,
    name: "MaLoaiTienNghiCanHo",
    length: 255,
  })
  maLoaiTienNghiCanHo: string;

  @Column("nvarchar", { primary: true, name: "MaCanHo", length: 255 })
  maCanHo: string;

  @Column("nvarchar", { primary: true, name: "MaBCT", length: 255 })
  maBct: string;

  @Column("nvarchar", { primary: true, name: "MaLoaiLuuTru", length: 255 })
  maLoaiLuuTru: string;

  @ManyToOne(
    () => DanhSachCanHo,
    (danhSachCanHo) => danhSachCanHo.tienNghiCanHos
  )
  @JoinColumn([
    { name: "MaCanHo", referencedColumnName: "maCanHo" },
    { name: "MaBCT", referencedColumnName: "maBct" },
    { name: "MaLoaiLuuTru", referencedColumnName: "maLoaiLuuTru" },
  ])
  danhSachCanHo: DanhSachCanHo;

  @ManyToOne(
    () => LoaiTienNghiCanHo,
    (loaiTienNghiCanHo) => loaiTienNghiCanHo.tienNghiCanHos
  )
  @JoinColumn([
    {
      name: "MaLoaiTienNghiCanHo",
      referencedColumnName: "maLoaiTienNghiCanHo",
    },
  ])
  maLoaiTienNghiCanHo2: LoaiTienNghiCanHo;
}
