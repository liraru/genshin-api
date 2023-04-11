import { Test, TestingModule } from '@nestjs/testing';
import { BowjaDataService } from './bowja-data.service';

describe('BowjaDataService', () => {
  let service: BowjaDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BowjaDataService],
    }).compile();

    service = module.get<BowjaDataService>(BowjaDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
