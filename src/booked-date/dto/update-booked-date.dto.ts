import { PartialType } from '@nestjs/swagger';
import { CreateBookedDateDto } from './create-booked-date.dto';

export class UpdateBookedDateDto extends PartialType(CreateBookedDateDto) {}
