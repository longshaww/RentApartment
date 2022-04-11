import { ApiProperty } from '@nestjs/swagger';

export class GetOneApartmentDto {
  @ApiProperty()
  MaCanHo: string;
  @ApiProperty()
  MaBCT: string;
}
