import { Test, TestingModule } from '@nestjs/testing';
import { AutoImportWishService } from './auto-import-wish.service';

describe('AutoImportWishService', () => {
  let service: AutoImportWishService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutoImportWishService],
    }).compile();

    service = module.get<AutoImportWishService>(AutoImportWishService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
