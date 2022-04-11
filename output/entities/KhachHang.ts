import { Column, Entity, Index, OneToMany } from "typeorm";
import { PhieuDatPhong } from "./PhieuDatPhong";

@Index("PK__KhachHan__88D2F0E57A2C812F", ["maKhachHang"], { unique: true })
@Entity("KhachHang", { schema: "dbo" })
export class KhachHang {
  @Column("nvarchar", { primary: true, name: "MaKhachHang", length: 255 })
  maKhachHang: string;

  @Column("nvarchar", { name: "Ten", length: 255 })
  ten: string;

  @Column("nvarchar", { name: "Email", length: 255 })
  email: string;

  @Column("nvarchar", { name: "SDT", length: 255 })
  sdt: string;

  @Column("ntext", { name: "YeuCau" })
  yeuCau: string;

  @OneToMany(() => PhieuDatPhong, (phieuDatPhong) => phieuDatPhong.maKhachHang2)
  phieuDatPhongs: PhieuDatPhong[];
}
