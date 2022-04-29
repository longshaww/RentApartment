import { Test, TestingModule } from '@nestjs/testing';
import { BookedDateController } from './booked-date.controller';
import { BookedDateService } from './booked-date.service';

describe('BookedDateController', () => {
  let controller: BookedDateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookedDateController],
      providers: [BookedDateService],
    }).compile();

    controller = module.get<BookedDateController>(BookedDateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
