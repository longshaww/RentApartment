import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { LoaILuuTru } from './LoaILuuTru';
import { TienNghiBenChoThue } from './TienNghiBenChoThue';
import { CanHo } from './CanHo';
import { HinhAnhBct } from './HinhAnhBct';

@Index('PK__BenChoTh__35217F3B8F2111AB', ['maBct'], { unique: true })
@Entity('BenChoThue', { schema: 'dbo' })
export class BenChoThue {
  @Column('nvarchar', { primary: true, name: 'MaBCT', length: 255 })
  maBct: string;

  @Column('nvarchar', { name: 'TenBCT', length: 255 })
  tenBct: string;

  @Column('ntext', { name: 'DiaChi' })
  diaChi: string;

  @Column('float', { name: 'GiaTrungBinh', precision: 53 })
  giaTrungBinh: number;

  @Column('int', { name: 'SoSao' })
  soSao: number;

  @Column('int', { name: 'LuotDanhGia' })
  luotDanhGia: number;

  @Column('ntext', { name: 'MoTa', nullable: true })
  moTa: string | null;

  @Column('float', { name: 'DiemTienNghi' })
  diemTienNghi: number;

  @ManyToOne(() => LoaILuuTru, (loaILuuTru) => loaILuuTru.benChoThues)
  @JoinColumn([{ name: 'MaLoaiLuuTru', referencedColumnName: 'maLoaiLuuTru' }])
  maLoaiLuuTru: LoaILuuTru;

  @ManyToMany(
    () => TienNghiBenChoThue,
    (tienNghiBenChoThue) => tienNghiBenChoThue.benChoThues,
  )
  tienNghiBenChoThues: TienNghiBenChoThue[];

  @OneToMany(() => CanHo, (canHo) => canHo.maBct2)
  canHos: CanHo[];

  @OneToMany(() => HinhAnhBct, (hinhAnhBct) => hinhAnhBct.maBct)
  hinhAnhBcts: HinhAnhBct[];
  tienNghiBCT: [];
}
