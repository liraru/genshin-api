import { Test, TestingModule } from '@nestjs/testing';
import { WishHistoryController } from './wish-history.controller';

describe('WishHistoryController', () => {
  let controller: WishHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WishHistoryController],
    }).compile();

    controller = module.get<WishHistoryController>(WishHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
