import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BenChoThue } from "./BenChoThue";
import { LoaiHinhAnhBct } from "./LoaiHinhAnhBct";

@Index(
  "PK__HinhAnhB__138B3CC1896D92E5",
  ["maHinhAnhBct", "maLoaiHinhAnhBct", "maBct", "maLoaiLuuTru"],
  { unique: true }
)
@Entity("HinhAnhBCT", { schema: "dbo" })
export class HinhAnhBct {
  @Column("nvarchar", { primary: true, name: "MaHinhAnhBCT", length: 255 })
  maHinhAnhBct: string;

  @Column("nvarchar", { primary: true, name: "MaLoaiHinhAnhBCT", length: 255 })
  maLoaiHinhAnhBct: string;

  @Column("text", { name: "URLImageBCT", nullable: true })
  urlImageBct: string | null;

  @Column("nvarchar", { primary: true, name: "MaBCT", length: 255 })
  maBct: string;

  @Column("nvarchar", { primary: true, name: "MaLoaiLuuTru", length: 255 })
  maLoaiLuuTru: string;

  @ManyToOne(() => BenChoThue, (benChoThue) => benChoThue.hinhAnhBcts)
  @JoinColumn([
    { name: "MaBCT", referencedColumnName: "maBct" },
    { name: "MaLoaiLuuTru", referencedColumnName: "maLoaiLuuTru" },
  ])
  benChoThue: BenChoThue;

  @ManyToOne(
    () => LoaiHinhAnhBct,
    (loaiHinhAnhBct) => loaiHinhAnhBct.hinhAnhBcts
  )
  @JoinColumn([
    { name: "MaLoaiHinhAnhBCT", referencedColumnName: "maLoaiHinhAnhBct" },
  ])
  maLoaiHinhAnhBct2: LoaiHinhAnhBct;
}
