import { Controller, Get, Query } from '@nestjs/common';
import { WishHistoryService } from './services/wish-history/wish-history.service';

@Controller('/wish-history')
export class WishHistoryController {
  constructor(private _wishHistoryService: WishHistoryService) {}

  @Get('pity')
  public getPity(@Query() queryParams: { user: number }) {
    return this._wishHistoryService.getPity(queryParams.user);
  }

  @Get('five-stars')
  public getFiveStarsHistory(@Query() queryParams: { user: number }) {
    return this._wishHistoryService.getFiveStarHistory(queryParams.user);
  }

  @Get('volume-chart')
  public getChartValues(@Query() queryParams: { user: number }) {
    console.log('QUERY', queryParams);
    return this._wishHistoryService.getBarChartData(queryParams.user);
  }
}
