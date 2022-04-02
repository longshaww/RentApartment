import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { DanhSachCanHo } from "./DanhSachCanHo";
import { BenChoThue } from "./BenChoThue";
import { LoaiHinhAnh } from "./LoaiHinhAnh";

@Index("PK__HinhAnh__BA63DAD76CBFA4EE", ["maHinhAnh", "maLoaiHinhAnh"], {
  unique: true,
})
@Entity("HinhAnh", { schema: "dbo" })
export class HinhAnh {
  @Column("nvarchar", { primary: true, name: "MaHinhAnh", length: 20 })
  maHinhAnh: string;

  @Column("nvarchar", { primary: true, name: "MaLoaiHinhAnh", length: 20 })
  maLoaiHinhAnh: string;

  @Column("nvarchar", { name: "URLImage", nullable: true, length: 255 })
  urlImage: string | null;

  @OneToMany(() => DanhSachCanHo, (danhSachCanHo) => danhSachCanHo.hinhAnh)
  danhSachCanHos: DanhSachCanHo[];

  @ManyToOne(() => BenChoThue, (benChoThue) => benChoThue.hinhAnhs)
  @JoinColumn([
    { name: "MaBCT", referencedColumnName: "maBct" },
    { name: "MaLoaiCanHo", referencedColumnName: "maLoaiCanHo" },
  ])
  benChoThue: BenChoThue;

  @ManyToOne(() => LoaiHinhAnh, (loaiHinhAnh) => loaiHinhAnh.hinhAnhs)
  @JoinColumn([
    { name: "MaLoaiHinhAnh", referencedColumnName: "maLoaiHinhAnh" },
  ])
  maLoaiHinhAnh2: LoaiHinhAnh;
}
