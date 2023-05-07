import { Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { WishHistoryService } from 'src/modules/wish-history/services/wish-history/wish-history.service';

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
    return this._wishHistoryService.getBarChartData(queryParams.user);
  }

  @Post('upload-excel')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Query() queryParams: { user: number }) {
    console.log(file);
    // TODO: Save file on directory
    return this._wishHistoryService.importWishExcel(queryParams.user);
  }

  @Get('parse-excel')
  public parseExcel(@Query() queryParams: { user: number }) {
    return this._wishHistoryService.importWishExcel(queryParams.user);
  }
}
