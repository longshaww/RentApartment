import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { LoaILuuTru } from "./LoaILuuTru";
import { BinhLuan } from "./BinhLuan";
import { DanhSachCanHo } from "./DanhSachCanHo";
import { HinhAnhBct } from "./HinhAnhBct";
import { TienNghiBenChoThue } from "./TienNghiBenChoThue";

@Index("PK__BenChoTh__D194CB82DFEF1E4E", ["maBct", "maLoaiLuuTru"], {
  unique: true,
})
@Entity("BenChoThue", { schema: "dbo" })
export class BenChoThue {
  @Column("nvarchar", { primary: true, name: "MaBCT", length: 255 })
  maBct: string;

  @Column("nvarchar", { primary: true, name: "MaLoaiLuuTru", length: 255 })
  maLoaiLuuTru: string;

  @Column("nvarchar", { name: "TenBCT", nullable: true, length: 255 })
  tenBct: string | null;

  @Column("nvarchar", { name: "DiaChi", nullable: true, length: 255 })
  diaChi: string | null;

  @Column("float", { name: "GiaTrungBinh", nullable: true, precision: 53 })
  giaTrungBinh: number | null;

  @Column("int", { name: "SoSao", nullable: true })
  soSao: number | null;

  @Column("int", { name: "LuotDanhGia", nullable: true })
  luotDanhGia: number | null;

  @Column("nvarchar", { name: "MoTa", nullable: true, length: 255 })
  moTa: string | null;

  @ManyToOne(() => LoaILuuTru, (loaILuuTru) => loaILuuTru.benChoThues)
  @JoinColumn([{ name: "MaLoaiLuuTru", referencedColumnName: "maLoaiLuuTru" }])
  maLoaiLuuTru2: LoaILuuTru;

  @OneToMany(() => BinhLuan, (binhLuan) => binhLuan.benChoThue)
  binhLuans: BinhLuan[];

  @OneToMany(() => DanhSachCanHo, (danhSachCanHo) => danhSachCanHo.benChoThue)
  danhSachCanHos: DanhSachCanHo[];

  @OneToMany(() => HinhAnhBct, (hinhAnhBct) => hinhAnhBct.benChoThue)
  hinhAnhBcts: HinhAnhBct[];

  @OneToMany(
    () => TienNghiBenChoThue,
    (tienNghiBenChoThue) => tienNghiBenChoThue.benChoThue
  )
  tienNghiBenChoThues: TienNghiBenChoThue[];
}
