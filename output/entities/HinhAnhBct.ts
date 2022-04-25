import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BenChoThue } from "./BenChoThue";

@Index("PK__HinhAnhB__092D46E7B93404AB", ["maHinhAnhBct"], { unique: true })
@Entity("HinhAnhBCT", { schema: "dbo" })
export class HinhAnhBct {
  @Column("nvarchar", { primary: true, name: "MaHinhAnhBCT", length: 255 })
  maHinhAnhBct: string;

  @Column("text", { name: "URLImageBCT" })
  urlImageBct: string;

  @ManyToOne(() => BenChoThue, (benChoThue) => benChoThue.hinhAnhBcts)
  @JoinColumn([{ name: "MaBCT", referencedColumnName: "maBct" }])
  maBct: BenChoThue;
}
