import { ApiProperty } from '@nestjs/swagger';

export class Apartment {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
