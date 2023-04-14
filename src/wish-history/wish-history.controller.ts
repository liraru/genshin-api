import { Controller, Get } from '@nestjs/common';
import { WishHistoryService } from './services/wish-history/wish-history.service';

@Controller('/wish-history')
export class WishHistoryController {
  constructor(private wishHistoryService: WishHistoryService) {}

  @Get()
  public async findAll() {
    return this.wishHistoryService.findAll();
  }

  @Get('pity')
  public getPity() {
    return this.wishHistoryService.getPity();
  }
}
