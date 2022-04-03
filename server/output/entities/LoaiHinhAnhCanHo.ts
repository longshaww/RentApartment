import { Column, Entity, Index, OneToMany } from "typeorm";
import { HinhAnhCanHo } from "./HinhAnhCanHo";

@Index("PK__LoaiHinh__729D897F0146866B", ["maLoaiHinhAnhCanHo"], {
  unique: true,
})
@Entity("LoaiHinhAnhCanHo", { schema: "dbo" })
export class LoaiHinhAnhCanHo {
  @Column("nvarchar", {
    primary: true,
    name: "MaLoaiHinhAnhCanHo",
    length: 255,
  })
  maLoaiHinhAnhCanHo: string;

  @Column("nvarchar", { name: "LoaiHinhAnhCanHo", nullable: true, length: 255 })
  loaiHinhAnhCanHo: string | null;

  @OneToMany(
    () => HinhAnhCanHo,
    (hinhAnhCanHo) => hinhAnhCanHo.maLoaiHinhAnhCanHo2
  )
  hinhAnhCanHos: HinhAnhCanHo[];
}
