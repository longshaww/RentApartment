import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BenChoThue } from './BenChoThue';

@Entity('LoaILuuTru', { schema: 'dbo' })
export class LoaILuuTru {
  @Column('nvarchar', { primary: true, name: 'MaLoaiLuuTru', length: 255 })
  maLoaiLuuTru: string;

  @Column('nvarchar', { name: 'TenLoaiLuuTru', length: 255 })
  tenLoaiLuuTru: string;

  @OneToMany(() => BenChoThue, (benChoThue) => benChoThue.maLoaiLuuTru)
  benChoThues: BenChoThue[];
}
