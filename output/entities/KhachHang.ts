import { Column, Entity, Index, OneToMany } from "typeorm";
import { BinhLuan } from "./BinhLuan";

@Index("PK__KhachHan__88D2F0E5D85E349A", ["maKhachHang"], { unique: true })
@Entity("KhachHang", { schema: "dbo" })
export class KhachHang {
  @Column("nvarchar", { primary: true, name: "MaKhachHang", length: 255 })
  maKhachHang: string;

  @OneToMany(() => BinhLuan, (binhLuan) => binhLuan.maKhachHang2)
  binhLuans: BinhLuan[];
}
