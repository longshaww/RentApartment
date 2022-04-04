import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { DanhSachCanHo } from "./DanhSachCanHo";

@Index(
  "PK__HinhAnhC__4574076F19B76A3B",
  ["maHinhAnhCanHo", "maCanHo", "maBct", "maLoaiLuuTru"],
  { unique: true }
)
@Entity("HinhAnhCanHo", { schema: "dbo" })
export class HinhAnhCanHo {
  @Column("nvarchar", { primary: true, name: "MaHinhAnhCanHo", length: 255 })
  maHinhAnhCanHo: string;

  @Column("text", { name: "URLImageCanHo", nullable: true })
  urlImageCanHo: string | null;

  @Column("nvarchar", { primary: true, name: "MaCanHo", length: 255 })
  maCanHo: string;

  @Column("nvarchar", { primary: true, name: "MaBCT", length: 255 })
  maBct: string;

  @Column("nvarchar", { primary: true, name: "MaLoaiLuuTru", length: 255 })
  maLoaiLuuTru: string;

  @ManyToOne(
    () => DanhSachCanHo,
    (danhSachCanHo) => danhSachCanHo.hinhAnhCanHos
  )
  @JoinColumn([
    { name: "MaCanHo", referencedColumnName: "maCanHo" },
    { name: "MaBCT", referencedColumnName: "maBct" },
    { name: "MaLoaiLuuTru", referencedColumnName: "maLoaiLuuTru" },
  ])
  danhSachCanHo: DanhSachCanHo;
}
