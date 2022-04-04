import { Column, Entity, Index, OneToMany } from "typeorm";
import { BenChoThue } from "./BenChoThue";

@Index("PK__LoaILuuT__4B5B4B9F3D859323", ["maLoaiLuuTru"], { unique: true })
@Entity("LoaILuuTru", { schema: "dbo" })
export class LoaILuuTru {
  @Column("nvarchar", { primary: true, name: "MaLoaiLuuTru", length: 255 })
  maLoaiLuuTru: string;

  @Column("nvarchar", { name: "TenLoaiCanHo", nullable: true, length: 255 })
  tenLoaiCanHo: string | null;

  @OneToMany(() => BenChoThue, (benChoThue) => benChoThue.maLoaiLuuTru2)
  benChoThues: BenChoThue[];
}
