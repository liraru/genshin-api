import { Controller, Get } from '@nestjs/common';
import { WishHistoryService } from './services/wish-history/wish-history.service';

@Controller('/wish-history')
export class WishHistoryController {
  constructor(private _wishHistoryService: WishHistoryService) {}

  @Get()
  public async findAll() {
    return this._wishHistoryService.findAll();
  }

  @Get('pity')
  public getPity() {
    return this._wishHistoryService.getPity();
  }

  @Get('five-stars')
  public getFiveStarsHistory() {
    return this._wishHistoryService.getFiveStarHistory();
  }

  @Get('chart')
  public getChartValues() {
    // TODO
  }
}
