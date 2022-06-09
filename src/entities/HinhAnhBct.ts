import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BenChoThue } from './BenChoThue';

@Entity('HinhAnhBCT', { schema: 'dbo' })
export class HinhAnhBct {
  @Column('nvarchar', { primary: true, name: 'MaHinhAnhBCT', length: 255 })
  maHinhAnhBct: string;

  @Column('text', { name: 'URLImageBCT' })
  urlImageBct: string;

  @ManyToOne(() => BenChoThue, (benChoThue) => benChoThue.hinhAnhBcts)
  @JoinColumn([{ name: 'MaBCT', referencedColumnName: 'maBct' }])
  maBct: BenChoThue;
}
