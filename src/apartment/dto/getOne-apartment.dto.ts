import { ApiProperty } from '@nestjs/swagger';

export class GetOneApartmentDto {
  @ApiProperty()
  maCanHo: string;
  @ApiProperty()
  maBct: string;
}
