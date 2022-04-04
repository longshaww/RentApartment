import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BenChoThue } from "./BenChoThue";

@Index(
  "PK__HinhAnhB__34340A5F08F145C1",
  ["maHinhAnhBct", "maBct", "maLoaiLuuTru"],
  { unique: true }
)
@Entity("HinhAnhBCT", { schema: "dbo" })
export class HinhAnhBct {
  @Column("nvarchar", { primary: true, name: "MaHinhAnhBCT", length: 255 })
  maHinhAnhBct: string;

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
}
