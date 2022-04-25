import { Column, Entity, Index, ManyToMany } from 'typeorm';
import { BenChoThue } from './BenChoThue';

@Entity('TienNghiBenChoThue', { schema: 'dbo' })
export class TienNghiBenChoThue {
  @Column('nvarchar', { primary: true, name: 'MaTienNghiBCT', length: 255 })
  maTienNghiBct: string;

  @Column('nvarchar', { name: 'TenTienNghiBCT', length: 255 })
  tenTienNghiBct: string;

  @ManyToMany(() => BenChoThue, (benChoThue) => benChoThue.tienNghiBenChoThues)
  benChoThues: BenChoThue[];
}
