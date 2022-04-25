import { Column, Entity, Index, OneToMany } from 'typeorm';
import { CanHoTienNghiCanHo } from './CanHoTienNghiCanHo';

@Entity('TienNghiCanHo', { schema: 'dbo' })
export class TienNghiCanHo {
  @Column('nvarchar', { primary: true, name: 'MaTienNghiCanHo', length: 255 })
  maTienNghiCanHo: string;

  @Column('nvarchar', { name: 'TenTienNghiCanHo', length: 255 })
  tenTienNghiCanHo: string;

  @OneToMany(
    () => CanHoTienNghiCanHo,
    (canHoTienNghiCanHo) => canHoTienNghiCanHo.maTienNghiCanHo2,
  )
  canHoTienNghiCanHos: CanHoTienNghiCanHo[];
}
