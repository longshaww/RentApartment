import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { LoaILuuTru } from './LoaILuuTru';
import { TienNghiBenChoThue } from './TienNghiBenChoThue';
import { CanHo } from './CanHo';
import { HinhAnhBct } from './HinhAnhBct';

@Entity('BenChoThue', { schema: 'dbo' })
export class BenChoThue {
  @Column('nvarchar', { primary: true, name: 'MaBCT', length: 255 })
  maBct: string;

  @Column('nvarchar', { name: 'MaPartner', length: 255, nullable: true })
  maPartner: string;

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

  @Column('float', { name: 'DiemTienLoi', precision: 53 })
  diemTienLoi: number;

  @ManyToOne(() => LoaILuuTru, (loaILuuTru) => loaILuuTru.benChoThues)
  @JoinColumn([{ name: 'MaLoaiLuuTru', referencedColumnName: 'maLoaiLuuTru' }])
  maLoaiLuuTru: LoaILuuTru;

  @ManyToMany(
    () => TienNghiBenChoThue,
    (tienNghiBenChoThue) => tienNghiBenChoThue.benChoThues,
  )
  @JoinTable({
    name: 'BenChoThue_TienNghiBenChoThue',
    joinColumns: [{ name: 'MaBCT', referencedColumnName: 'maBct' }],
    inverseJoinColumns: [
      { name: 'MaTienNghiBCT', referencedColumnName: 'maTienNghiBct' },
    ],
    schema: 'dbo',
  })
  tienNghiBenChoThues: TienNghiBenChoThue[];

  @OneToMany(() => CanHo, (canHo) => canHo.maBct2)
  canHos: CanHo[];

  @OneToMany(() => HinhAnhBct, (hinhAnhBct) => hinhAnhBct.maBct)
  hinhAnhBcts: HinhAnhBct[];
  tienNghiBCT: [];
}
