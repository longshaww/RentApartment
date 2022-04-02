import { ApiProperty } from '@nestjs/swagger';

export class CreateLessorDto {
  @ApiProperty()
  nameLessor: string;
  @ApiProperty()
  addressLessor: string;
  @ApiProperty()
  priceAverage: number;
  @ApiProperty()
  starCount: number;
  @ApiProperty()
  rateCount: number;
  @ApiProperty()
  description: string;
}
