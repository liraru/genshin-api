import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as ExcelToJson from 'convert-excel-to-json';
import * as fs from 'fs';
import { CONSTANTS } from 'src/constants';
import { WishHistory } from 'src/entities/wish-history.entity';
import { BANNERS } from 'src/modules/wish-history/constants';
import { IExcelRow, IExcelRowTitle, ITypeAmount } from 'src/modules/wish-history/interfaces/excel.interface';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AutoImportWishService {
  constructor(
    @InjectRepository(WishHistory) private _wishHistoryRepo: Repository<WishHistory>,
    private readonly _dataSource: DataSource
  ) {}

  private _excelColumnToExcelTitle(excelRow: IExcelRow): IExcelRowTitle {
    return {
      Type: excelRow.A,
      Name: excelRow.B,
      Time: excelRow.C,
      Rarity: excelRow.D,
      Pity: excelRow.E,
      Roll: excelRow.F,
      Group: excelRow.G,
      Title: excelRow.H,
      Part: excelRow.I
    };
  }

  private _parseExcelRowToWishRow(row: IExcelRowTitle, banner: string, user: number): WishHistory {
    return {
      Banner: banner,
      user_id: user ?? 1,
      Group: row.Group,
      Name: row.Name,
      Part: row.Part,
      Pity: row.Pity,
      Rarity: row.Rarity,
      Roll: row.Roll,
      Time: row.Time,
      Title: row.Title,
      Type: row.Type
    };
  }

  private async _importBanner(excelBannerData: IExcelRow[], banner: string, user?: number): Promise<ITypeAmount> {
    // SELECT Time FROM user_wish_history uwh WHERE Banner = 'Character Event' ORDER BY `Time` DESC LIMIT 1
    const lastPull = await this._dataSource
      .getRepository(WishHistory)
      .createQueryBuilder('lastPull')
      .select('lastPull.Time')
      .where(`lastPull.banner = '${banner}'`)
      .orderBy('lastPull.Time', 'DESC')
      .limit(1)
      .getOne();

    const lastPullTime = lastPull?.Time;
    let newPullsCount = 0;
    console.log(`LAST PULL FROM ${banner} AT ${lastPullTime}`);

    excelBannerData.forEach((row: IExcelRow) => {
      const parsed: IExcelRowTitle = this._excelColumnToExcelTitle(row);
      if (!lastPullTime || parsed.Time > lastPullTime) {
        if (parsed.Rarity > 3) {
          console.log(`>>> Adding ${parsed.Name.toUpperCase()} from ${banner.toUpperCase()} banner`);
        }
        this._wishHistoryRepo.insert(this._parseExcelRowToWishRow(parsed, banner, user));
        newPullsCount++;
      }
    });
    return { type: banner, amount: newPullsCount };
  }

  async readExcel(user?: number): Promise<ITypeAmount[]> {
    console.clear();
    if (fs.existsSync(CONSTANTS.EXCEL_FILE)) {
      const excelData = ExcelToJson({
        source: fs.readFileSync(CONSTANTS.EXCEL_FILE),
        header: { rows: 1 }
      });

      return Promise.all([
        this._importBanner(excelData[BANNERS.CHARACTERS], BANNERS.CHARACTERS, user),
        this._importBanner(excelData[BANNERS.WEAPONS], BANNERS.WEAPONS, user),
        this._importBanner(excelData[BANNERS.STANDARD], BANNERS.STANDARD, user)
      ]);
    }
  }
}
