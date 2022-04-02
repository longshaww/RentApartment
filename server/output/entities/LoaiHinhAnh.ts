import { Column, Entity, Index, OneToMany } from "typeorm";
import { HinhAnh } from "./HinhAnh";

@Index("PK__LoaiHinh__3A0A04C0FDB2B1F4", ["maLoaiHinhAnh"], { unique: true })
@Entity("LoaiHinhAnh", { schema: "dbo" })
export class LoaiHinhAnh {
  @Column("nvarchar", { primary: true, name: "MaLoaiHinhAnh", length: 20 })
  maLoaiHinhAnh: string;

  @Column("nvarchar", { name: "TenLoaiHinhAnh", nullable: true, length: 20 })
  tenLoaiHinhAnh: string | null;

  @OneToMany(() => HinhAnh, (hinhAnh) => hinhAnh.maLoaiHinhAnh2)
  hinhAnhs: HinhAnh[];
}
