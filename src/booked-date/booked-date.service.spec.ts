import { Test, TestingModule } from '@nestjs/testing';
import { BookedDateService } from './booked-date.service';

describe('BookedDateService', () => {
  let service: BookedDateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookedDateService],
    }).compile();

    service = module.get<BookedDateService>(BookedDateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
