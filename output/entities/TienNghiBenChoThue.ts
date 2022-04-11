import { Column, Entity, Index, JoinTable, ManyToMany } from "typeorm";
import { BenChoThue } from "./BenChoThue";

@Index("PK__TienNghi__8FD23AC56D89E554", ["maTienNghiBct"], { unique: true })
@Entity("TienNghiBenChoThue", { schema: "dbo" })
export class TienNghiBenChoThue {
  @Column("nvarchar", { primary: true, name: "MaTienNghiBCT", length: 255 })
  maTienNghiBct: string;

  @Column("nvarchar", { name: "TenTienNghiBCT", length: 255 })
  tenTienNghiBct: string;

  @ManyToMany(() => BenChoThue, (benChoThue) => benChoThue.tienNghiBenChoThues)
  @JoinTable({
    name: "BenChoThue_TienNghiBenChoThue",
    joinColumns: [
      { name: "MaTienNghiBCT", referencedColumnName: "maTienNghiBct" },
    ],
    inverseJoinColumns: [{ name: "MaBCT", referencedColumnName: "maBct" }],
    schema: "dbo",
  })
  benChoThues: BenChoThue[];
}
