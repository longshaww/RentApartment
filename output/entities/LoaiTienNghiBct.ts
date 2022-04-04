import { Column, Entity, Index, OneToMany } from "typeorm";
import { TienNghiBenChoThue } from "./TienNghiBenChoThue";

@Index("PK__LoaiTien__4B3283453CB19950", ["maLoaiTienNghiBct"], {
  unique: true,
})
@Entity("LoaiTienNghiBCT", { schema: "dbo" })
export class LoaiTienNghiBct {
  @Column("nvarchar", { primary: true, name: "MaLoaiTienNghiBCT", length: 255 })
  maLoaiTienNghiBct: string;

  @Column("nvarchar", { name: "LoaiTienNghiBCT", length: 255 })
  loaiTienNghiBct: string;

  @OneToMany(
    () => TienNghiBenChoThue,
    (tienNghiBenChoThue) => tienNghiBenChoThue.maLoaiTienNghiBct2
  )
  tienNghiBenChoThues: TienNghiBenChoThue[];
}
