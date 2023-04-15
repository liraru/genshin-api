import { Test, TestingModule } from '@nestjs/testing';
import { WishHistoryQueryBuildersService } from './wish-history-query-builders.service';

describe('WishHistoryQueryBuildersService', () => {
  let service: WishHistoryQueryBuildersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WishHistoryQueryBuildersService],
    }).compile();

    service = module.get<WishHistoryQueryBuildersService>(WishHistoryQueryBuildersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
