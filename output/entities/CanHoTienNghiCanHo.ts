import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { CanHo } from './CanHo';
import { TienNghiCanHo } from './TienNghiCanHo';

@Entity('CanHo_TienNghiCanHo', { schema: 'dbo' })
export class CanHoTienNghiCanHo {
  @Column('nvarchar', { primary: true, name: 'MaCanHo', length: 255 })
  maCanHo: string;

  @Column('nvarchar', { primary: true, name: 'MaTienNghiCanHo', length: 255 })
  maTienNghiCanHo: string;

  @Column('nvarchar', { primary: true, name: 'MaBCT', length: 255 })
  maBct: string;

  @ManyToOne(() => CanHo, (canHo) => canHo.canHoTienNghiCanHos)
  @JoinColumn([
    { name: 'MaCanHo', referencedColumnName: 'maCanHo' },
    { name: 'MaBCT', referencedColumnName: 'maBct' },
  ])
  canHo: CanHo;

  @ManyToOne(
    () => TienNghiCanHo,
    (tienNghiCanHo) => tienNghiCanHo.canHoTienNghiCanHos,
  )
  @JoinColumn([
    { name: 'MaTienNghiCanHo', referencedColumnName: 'maTienNghiCanHo' },
  ])
  maTienNghiCanHo2: TienNghiCanHo;
}
