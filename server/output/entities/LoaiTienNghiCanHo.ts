import { Column, Entity, Index, OneToMany } from "typeorm";
import { TienNghiCanHo } from "./TienNghiCanHo";

@Index("PK__LoaiTien__FC3DAB276A62FE56", ["maLoaiTienNghiCanHo"], {
  unique: true,
})
@Entity("LoaiTienNghiCanHo", { schema: "dbo" })
export class LoaiTienNghiCanHo {
  @Column("nvarchar", {
    primary: true,
    name: "MaLoaiTienNghiCanHo",
    length: 255,
  })
  maLoaiTienNghiCanHo: string;

  @Column("nvarchar", {
    name: "LoaiTienNghiCanHo",
    nullable: true,
    length: 255,
  })
  loaiTienNghiCanHo: string | null;

  @OneToMany(
    () => TienNghiCanHo,
    (tienNghiCanHo) => tienNghiCanHo.maLoaiTienNghiCanHo2
  )
  tienNghiCanHos: TienNghiCanHo[];
}
