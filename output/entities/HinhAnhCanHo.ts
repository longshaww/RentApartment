import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { CanHo } from "./CanHo";

@Index("PK__HinhAnhC__82A5DAF8A3D4009B", ["maHinhAnhCanHo"], { unique: true })
@Entity("HinhAnhCanHo", { schema: "dbo" })
export class HinhAnhCanHo {
  @Column("nvarchar", { primary: true, name: "MaHinhAnhCanHo", length: 255 })
  maHinhAnhCanHo: string;

  @Column("text", { name: "URLImageCanHo" })
  urlImageCanHo: string;

  @ManyToOne(() => CanHo, (canHo) => canHo.hinhAnhCanHos)
  @JoinColumn([
    { name: "MaCanHo", referencedColumnName: "maCanHo" },
    { name: "MaBCT", referencedColumnName: "maBct" },
  ])
  canHo: CanHo;
}
