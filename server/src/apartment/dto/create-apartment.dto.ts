import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateApartmentDto {
  @ApiProperty()
  @IsString()
  @MaxLength(20)
  name: string;
}
