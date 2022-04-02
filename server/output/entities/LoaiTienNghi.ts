import { Column, Entity, Index, OneToMany } from "typeorm";
import { TienNghi } from "./TienNghi";

@Index("PK__LoaiTien__DF5996417DBE3C88", ["maLoaiTienNghi"], { unique: true })
@Entity("LoaiTienNghi", { schema: "dbo" })
export class LoaiTienNghi {
  @Column("nvarchar", { primary: true, name: "MaLoaiTienNghi", length: 20 })
  maLoaiTienNghi: string;

  @Column("nvarchar", { name: "LoaiTienNghi", length: 20 })
  loaiTienNghi: string;

  @OneToMany(() => TienNghi, (tienNghi) => tienNghi.maLoaiTienNghi2)
  tienNghis: TienNghi[];
}
