import { Test, TestingModule } from '@nestjs/testing';
import { WishHistoryService } from './wish-history/wish-history.service';

describe('WishHistoryService', () => {
  let service: WishHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WishHistoryService],
    }).compile();

    service = module.get<WishHistoryService>(WishHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
