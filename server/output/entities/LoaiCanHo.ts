import { Column, Entity, Index, OneToMany } from "typeorm";
import { BenChoThue } from "./BenChoThue";

@Index("PK__LoaiCanH__9011F2C50D3B708C", ["maLoaiCanHo"], { unique: true })
@Entity("LoaiCanHo", { schema: "dbo" })
export class LoaiCanHo {
  @Column("nvarchar", { primary: true, name: "MaLoaiCanHo", length: 20 })
  maLoaiCanHo: string;

  @Column("nvarchar", { name: "TenLoaiCanHo", nullable: true, length: 20 })
  tenLoaiCanHo: string | null;

  @OneToMany(() => BenChoThue, (benChoThue) => benChoThue.maLoaiCanHo2)
  benChoThues: BenChoThue[];
}
