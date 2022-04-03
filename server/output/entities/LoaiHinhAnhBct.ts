import { Column, Entity, Index, OneToMany } from "typeorm";
import { HinhAnhBct } from "./HinhAnhBct";

@Index("PK__LoaiHinh__977EEED84CD655BF", ["maLoaiHinhAnhBct"], { unique: true })
@Entity("LoaiHinhAnhBCT", { schema: "dbo" })
export class LoaiHinhAnhBct {
  @Column("nvarchar", { primary: true, name: "MaLoaiHinhAnhBCT", length: 255 })
  maLoaiHinhAnhBct: string;

  @Column("nvarchar", {
    name: "TenLoaiHinhAnhBCT",
    nullable: true,
    length: 255,
  })
  tenLoaiHinhAnhBct: string | null;

  @OneToMany(() => HinhAnhBct, (hinhAnhBct) => hinhAnhBct.maLoaiHinhAnhBct2)
  hinhAnhBcts: HinhAnhBct[];
}
