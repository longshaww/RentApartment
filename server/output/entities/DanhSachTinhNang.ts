import { Column, Entity, Index, OneToMany } from "typeorm";
import { DanhSachCanHo } from "./DanhSachCanHo";

@Index("PK__DanhSach__2B4591DF12411924", ["maTinhNang"], { unique: true })
@Entity("DanhSachTinhNang", { schema: "dbo" })
export class DanhSachTinhNang {
  @Column("nvarchar", { primary: true, name: "MaTinhNang", length: 20 })
  maTinhNang: string;

  @Column("nvarchar", { name: "TenTinhNang", nullable: true, length: 20 })
  tenTinhNang: string | null;

  @OneToMany(() => DanhSachCanHo, (danhSachCanHo) => danhSachCanHo.maTinhNang)
  danhSachCanHos: DanhSachCanHo[];
}
