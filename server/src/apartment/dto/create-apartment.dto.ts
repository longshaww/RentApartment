import { ApiProperty } from '@nestjs/swagger';

export class CreateApartmentDto {
  @ApiProperty()
  name: string;
}
