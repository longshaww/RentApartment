import { Column, Entity, Index, OneToMany } from "typeorm";
import { ChiTietDatPhong } from "./ChiTietDatPhong";

@Index("PK__DanhSach__6344ADEAD855E57C", ["maDatPhong"], { unique: true })
@Entity("DanhSachDatPhong", { schema: "dbo" })
export class DanhSachDatPhong {
  @Column("nvarchar", { primary: true, name: "MaDatPhong", length: 255 })
  maDatPhong: string;

  @Column("float", { name: "GIaCanHo", nullable: true, precision: 53 })
  gIaCanHo: number | null;

  @Column("float", { name: "PhiVaThue", nullable: true, precision: 53 })
  phiVaThue: number | null;

  @Column("float", { name: "TongTien", nullable: true, precision: 53 })
  tongTien: number | null;

  @Column("datetime", { name: "NgayTao", nullable: true })
  ngayTao: Date | null;

  @Column("nvarchar", { name: "TrangThai", nullable: true, length: 255 })
  trangThai: string | null;

  @OneToMany(
    () => ChiTietDatPhong,
    (chiTietDatPhong) => chiTietDatPhong.maDatPhong2
  )
  chiTietDatPhongs: ChiTietDatPhong[];
}
