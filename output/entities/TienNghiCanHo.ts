import { Column, Entity, Index, OneToMany } from "typeorm";
import { CanHoTienNghiCanHo } from "./CanHoTienNghiCanHo";

@Index("PK__TienNghi__1C11E53341340034", ["maTienNghiCanHo"], { unique: true })
@Entity("TienNghiCanHo", { schema: "dbo" })
export class TienNghiCanHo {
  @Column("nvarchar", { primary: true, name: "MaTienNghiCanHo", length: 255 })
  maTienNghiCanHo: string;

  @Column("nvarchar", { name: "TenTienNghiCanHo", length: 255 })
  tenTienNghiCanHo: string;

  @OneToMany(
    () => CanHoTienNghiCanHo,
    (canHoTienNghiCanHo) => canHoTienNghiCanHo.maTienNghiCanHo2
  )
  canHoTienNghiCanHos: CanHoTienNghiCanHo[];
}
