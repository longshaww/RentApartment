import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { BenChoThue } from "./BenChoThue";
import { DanhSachCanHo } from "./DanhSachCanHo";
import { LoaiTienNghi } from "./LoaiTienNghi";

@Index("PK__TienNghi__E08E1629F7CDED6A", ["maTienNghi", "maLoaiTienNghi"], {
  unique: true,
})
@Entity("TienNghi", { schema: "dbo" })
export class TienNghi {
  @Column("nvarchar", { primary: true, name: "MaTienNghi", length: 20 })
  maTienNghi: string;

  @Column("nvarchar", { name: "TenTienNghi", nullable: true, length: 20 })
  tenTienNghi: string | null;

  @Column("nvarchar", { primary: true, name: "MaLoaiTienNghi", length: 20 })
  maLoaiTienNghi: string;

  @OneToMany(() => BenChoThue, (benChoThue) => benChoThue.tienNghi)
  benChoThues: BenChoThue[];

  @OneToMany(() => DanhSachCanHo, (danhSachCanHo) => danhSachCanHo.tienNghi)
  danhSachCanHos: DanhSachCanHo[];

  @ManyToOne(() => LoaiTienNghi, (loaiTienNghi) => loaiTienNghi.tienNghis)
  @JoinColumn([
    { name: "MaLoaiTienNghi", referencedColumnName: "maLoaiTienNghi" },
  ])
  maLoaiTienNghi2: LoaiTienNghi;
}
