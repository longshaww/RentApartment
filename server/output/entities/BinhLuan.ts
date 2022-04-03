import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BenChoThue } from "./BenChoThue";
import { KhachHang } from "./KhachHang";

@Index(
  "PK__BinhLuan__B49AA737C715139F",
  ["maBinhLuan", "maBct", "maLoaiLuuTru", "maKhachHang"],
  { unique: true }
)
@Entity("BinhLuan", { schema: "dbo" })
export class BinhLuan {
  @Column("nvarchar", { primary: true, name: "MaBinhLuan", length: 255 })
  maBinhLuan: string;

  @Column("nvarchar", { primary: true, name: "MaBCT", length: 255 })
  maBct: string;

  @Column("nvarchar", { primary: true, name: "MaLoaiLuuTru", length: 255 })
  maLoaiLuuTru: string;

  @Column("nvarchar", { primary: true, name: "MaKhachHang", length: 255 })
  maKhachHang: string;

  @Column("nvarchar", { name: "NoiDung", nullable: true, length: 255 })
  noiDung: string | null;

  @ManyToOne(() => BenChoThue, (benChoThue) => benChoThue.binhLuans)
  @JoinColumn([
    { name: "MaBCT", referencedColumnName: "maBct" },
    { name: "MaLoaiLuuTru", referencedColumnName: "maLoaiLuuTru" },
  ])
  benChoThue: BenChoThue;

  @ManyToOne(() => KhachHang, (khachHang) => khachHang.binhLuans)
  @JoinColumn([{ name: "MaKhachHang", referencedColumnName: "maKhachHang" }])
  maKhachHang2: KhachHang;
}
