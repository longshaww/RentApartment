import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { LoaiCanHo } from "./LoaiCanHo";
import { TienNghi } from "./TienNghi";
import { BinhLuan } from "./BinhLuan";
import { DanhSachCanHo } from "./DanhSachCanHo";
import { HinhAnh } from "./HinhAnh";

@Index("PK__BenChoTh__7C206017FD22F282", ["maBct", "maLoaiCanHo"], {
  unique: true,
})
@Entity("BenChoThue", { schema: "dbo" })
export class BenChoThue {
  @Column("nvarchar", { primary: true, name: "MaBCT", length: 20 })
  maBct: string;

  @Column("nvarchar", { primary: true, name: "MaLoaiCanHo", length: 20 })
  maLoaiCanHo: string;

  @Column("nvarchar", { name: "TenBCT", nullable: true, length: 20 })
  tenBct: string | null;

  @Column("nvarchar", { name: "DiaChi", nullable: true, length: 20 })
  diaChi: string | null;

  @Column("char", { name: "GiaTrungBinh", nullable: true, length: 10 })
  giaTrungBinh: string | null;

  @Column("int", { name: "SoSao", nullable: true })
  soSao: number | null;

  @Column("int", { name: "LuotDanhGia", nullable: true })
  luotDanhGia: number | null;

  @Column("nvarchar", { name: "MoTa", nullable: true, length: 255 })
  moTa: string | null;

  @ManyToOne(() => LoaiCanHo, (loaiCanHo) => loaiCanHo.benChoThues)
  @JoinColumn([{ name: "MaLoaiCanHo", referencedColumnName: "maLoaiCanHo" }])
  maLoaiCanHo2: LoaiCanHo;

  @ManyToOne(() => TienNghi, (tienNghi) => tienNghi.benChoThues)
  @JoinColumn([
    { name: "MaTienNghi", referencedColumnName: "maTienNghi" },
    { name: "MaLoaiTienNghi", referencedColumnName: "maLoaiTienNghi" },
  ])
  tienNghi: TienNghi;

  @OneToMany(() => BinhLuan, (binhLuan) => binhLuan.benChoThue)
  binhLuans: BinhLuan[];

  @OneToMany(() => DanhSachCanHo, (danhSachCanHo) => danhSachCanHo.benChoThue)
  danhSachCanHos: DanhSachCanHo[];

  @OneToMany(() => HinhAnh, (hinhAnh) => hinhAnh.benChoThue)
  hinhAnhs: HinhAnh[];
}
