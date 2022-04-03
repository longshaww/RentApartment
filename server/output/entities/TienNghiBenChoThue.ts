import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { LoaiTienNghiBct } from "./LoaiTienNghiBct";
import { BenChoThue } from "./BenChoThue";

@Index(
  "PK__TienNghi__48B0863A95F65407",
  ["maTienNghiBct", "maLoaiTienNghiBct", "maBct", "maLoaiLuuTru"],
  { unique: true }
)
@Entity("TienNghiBenChoThue", { schema: "dbo" })
export class TienNghiBenChoThue {
  @Column("nvarchar", { primary: true, name: "MaTienNghiBCT", length: 255 })
  maTienNghiBct: string;

  @Column("nvarchar", { name: "TenTienNghiBCT", nullable: true, length: 255 })
  tenTienNghiBct: string | null;

  @Column("nvarchar", { primary: true, name: "MaLoaiTienNghiBCT", length: 255 })
  maLoaiTienNghiBct: string;

  @Column("nvarchar", { primary: true, name: "MaBCT", length: 255 })
  maBct: string;

  @Column("nvarchar", { primary: true, name: "MaLoaiLuuTru", length: 255 })
  maLoaiLuuTru: string;

  @ManyToOne(
    () => LoaiTienNghiBct,
    (loaiTienNghiBct) => loaiTienNghiBct.tienNghiBenChoThues
  )
  @JoinColumn([
    { name: "MaLoaiTienNghiBCT", referencedColumnName: "maLoaiTienNghiBct" },
  ])
  maLoaiTienNghiBct2: LoaiTienNghiBct;

  @ManyToOne(() => BenChoThue, (benChoThue) => benChoThue.tienNghiBenChoThues)
  @JoinColumn([
    { name: "MaBCT", referencedColumnName: "maBct" },
    { name: "MaLoaiLuuTru", referencedColumnName: "maLoaiLuuTru" },
  ])
  benChoThue: BenChoThue;
}
