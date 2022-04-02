import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BenChoThue } from "./BenChoThue";
import { KhachHang } from "./KhachHang";

@Index(
  "PK__BinhLuan__EE41ED8EA371B475",
  ["maBinhLuan", "maBct", "maLoaiCanHo", "maKhachHang"],
  { unique: true }
)
@Entity("BinhLuan", { schema: "dbo" })
export class BinhLuan {
  @Column("nvarchar", { primary: true, name: "MaBinhLuan", length: 20 })
  maBinhLuan: string;

  @Column("nvarchar", { primary: true, name: "MaBCT", length: 20 })
  maBct: string;

  @Column("nvarchar", { primary: true, name: "MaLoaiCanHo", length: 20 })
  maLoaiCanHo: string;

  @Column("nvarchar", { primary: true, name: "MaKhachHang", length: 20 })
  maKhachHang: string;

  @Column("nvarchar", { name: "NoiDung", nullable: true, length: 10 })
  noiDung: string | null;

  @ManyToOne(() => BenChoThue, (benChoThue) => benChoThue.binhLuans)
  @JoinColumn([
    { name: "MaBCT", referencedColumnName: "maBct" },
    { name: "MaLoaiCanHo", referencedColumnName: "maLoaiCanHo" },
  ])
  benChoThue: BenChoThue;

  @ManyToOne(() => KhachHang, (khachHang) => khachHang.binhLuans)
  @JoinColumn([{ name: "MaKhachHang", referencedColumnName: "maKhachHang" }])
  maKhachHang2: KhachHang;
}
