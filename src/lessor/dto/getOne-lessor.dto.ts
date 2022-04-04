import { ApiProperty } from '@nestjs/swagger';

export class GetOneLessorDto {
  @ApiProperty()
  maBct: string;
  @ApiProperty()
  maLoaiLuuTru: string;
}
