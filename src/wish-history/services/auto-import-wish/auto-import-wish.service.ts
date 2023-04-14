import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as ExcelToJson from 'convert-excel-to-json';
import * as fs from 'fs';
import { DataSource, Repository } from 'typeorm';
import { WishHistory } from 'src/entities/wish-history.entity';
import { BANNERS } from 'src/wish-history/constants';

interface IExcelRow {
  A: string;
  B: string;
  C: string;
  D: number;
  E: number;
  F: number;
  G: number;
  H: string;
  I: string;
}

interface IExcelRowTitle {
  Type: string;
  Name: string;
  Time: string;
  Rarity: number;
  Pity: number;
  Roll: number;
  Group: number;
  Title: string;
  Part: string;
}

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

  private _parseExcelRowToWishRow(row: IExcelRowTitle, banner: string): WishHistory {
    return {
      Banner: banner,
      user_id: 1,
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

  private async _importBanner(excelBannerData: IExcelRow[], banner: string) {
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
    console.log(`LAST PULL FROM ${banner} AT ${lastPullTime}`);

    excelBannerData.forEach((row: IExcelRow) => {
      const parsed: IExcelRowTitle = this._excelColumnToExcelTitle(row);
      if (!lastPullTime || parsed.Time > lastPullTime) {
        console.log(`> ADDING ${parsed.Name} FROM ${banner} BANNER`);
        this._wishHistoryRepo.insert(this._parseExcelRowToWishRow(parsed, banner));
      }
    });
  }

  readExcel() {
    if (fs.existsSync('excel/paimonmoe_wish_history.xlsx')) {
      const excelData = ExcelToJson({
        source: fs.readFileSync('excel/paimonmoe_wish_history.xlsx'),
        header: { rows: 1 }
      });

      this._importBanner(excelData[BANNERS.CHARACTERS], BANNERS.CHARACTERS);
      this._importBanner(excelData[BANNERS.WEAPONS], BANNERS.WEAPONS);
      this._importBanner(excelData[BANNERS.STANDARD], BANNERS.STANDARD);
    }
  }
}
