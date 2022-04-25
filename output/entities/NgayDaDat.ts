import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { CanHo } from './CanHo';

@Entity('NgayDaDat', { schema: 'dbo' })
export class NgayDaDat {
  @Column('nvarchar', { primary: true, name: 'MaNgayDaDat', length: 255 })
  maNgayDaDat: string;

  @Column('datetime', { name: 'NgayDat' })
  ngayDat: Date;

  @Column('nvarchar', { primary: true, name: 'MaCanHo', length: 255 })
  maCanHo: string;

  @Column('nvarchar', { primary: true, name: 'MaBCT', length: 255 })
  maBct: string;

  @ManyToOne(() => CanHo, (canHo) => canHo.ngayDaDats)
  @JoinColumn([
    { name: 'MaCanHo', referencedColumnName: 'maCanHo' },
    { name: 'MaBCT', referencedColumnName: 'maBct' },
  ])
  canHo: CanHo;
}
