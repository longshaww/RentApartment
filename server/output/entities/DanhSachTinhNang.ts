import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { DanhSachCanHo } from "./DanhSachCanHo";

@Index(
  "PK__DanhSach__EC944C48653F2313",
  ["maTinhNang", "maCanHo", "maBct", "maLoaiLuuTru"],
  { unique: true }
)
@Entity("DanhSachTinhNang", { schema: "dbo" })
export class DanhSachTinhNang {
  @Column("nvarchar", { primary: true, name: "MaTinhNang", length: 255 })
  maTinhNang: string;

  @Column("nvarchar", { name: "TenTinhNang", nullable: true, length: 255 })
  tenTinhNang: string | null;

  @Column("nvarchar", { primary: true, name: "MaCanHo", length: 255 })
  maCanHo: string;

  @Column("nvarchar", { primary: true, name: "MaBCT", length: 255 })
  maBct: string;

  @Column("nvarchar", { primary: true, name: "MaLoaiLuuTru", length: 255 })
  maLoaiLuuTru: string;

  @ManyToOne(
    () => DanhSachCanHo,
    (danhSachCanHo) => danhSachCanHo.danhSachTinhNangs
  )
  @JoinColumn([
    { name: "MaCanHo", referencedColumnName: "maCanHo" },
    { name: "MaBCT", referencedColumnName: "maBct" },
    { name: "MaLoaiLuuTru", referencedColumnName: "maLoaiLuuTru" },
  ])
  danhSachCanHo: DanhSachCanHo;
}
