import { Controller, Get } from '@nestjs/common';
import { WishHistoryService } from './wish-history.service';

@Controller('/wish-history')
export class WishHistoryController {
  constructor(private wishHistoryService: WishHistoryService) {}

  @Get()
  public async findAll() {
    // return this.wishHistoryService.findAll();
    return 'this returns things'
  }
}
