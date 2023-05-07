import { Injectable } from '@nestjs/common';
import { Observable, forkJoin, from, map } from 'rxjs';
import { WishHistory } from 'src/entities/wish-history.entity';
import { BANNERS, ROLL_TYPE, STANDARD_CHARACTERS } from 'src/modules/wish-history/constants';
import { IFiveStarHistory, IFiveStarRoll } from 'src/modules/wish-history/interfaces/five-star-history.interface';
import { IMonthBarDB, IMonthlyBarChart } from 'src/modules/wish-history/interfaces/monthly-bar-chart.interface';
import { IPity } from 'src/modules/wish-history/interfaces/pity.interface';
import { WishHistoryQueryBuildersService } from '../wish-history-query-builders/wish-history-query-builders.service';
import { AutoImportWishService } from 'src/modules/wish-history/services/auto-import-wish/auto-import-wish.service';
import { ITypeAmount } from 'src/modules/wish-history/interfaces/excel.interface';

@Injectable()
export class WishHistoryService {
  constructor(
    private readonly _qbService: WishHistoryQueryBuildersService,
    private readonly _importWishService: AutoImportWishService
  ) {}

  private _checkFiftyWon(character: string, date: string, wonLast: boolean, banner: string): boolean {
    switch (banner) {
      case BANNERS.CHARACTERS:
        const standard = STANDARD_CHARACTERS.find((f) => f.character === character);
        return !wonLast ? false : !(standard && (standard?.promoReleaseEnd ?? '2020') < date);

      // TODO Weapons cases
      case BANNERS.WEAPONS:
        return true;

      case BANNERS.STANDARD:
        return true;
    }
  }

  private async _retrieveFiveStarsHistory(userId: number, banner: string) {
    const fiveStarPullQB = await this._qbService.getFiveStarsHistory(userId, banner);
    const fiveStarPulls: IFiveStarRoll[] = [];
    let lossCount = 0;

    fiveStarPullQB?.forEach((el: WishHistory) => {
      lossCount = lossCount === 2 ? 0 : lossCount;
      const roll: IFiveStarRoll = {
        name: el.Name,
        pity: el.Pity,
        fiftyWon: this._checkFiftyWon(el.Name, el.Time, lossCount !== 1, banner),
        date: el.Time,
        image: el.Type !== ROLL_TYPE.WEAPON ? el.icon : undefined
      };
      fiveStarPulls.push(roll);
      lossCount = roll.fiftyWon ? 0 : lossCount + 1;
    });

    return fiveStarPulls.sort((a, b) => (a.date > b.date ? -1 : 1));
  }

  getPity(userId: number): Observable<IPity> {
    return forkJoin({
      char5: from(this._qbService.getCurrentPity(userId, BANNERS.CHARACTERS, 5)),
      char4: from(this._qbService.getCurrentPity(userId, BANNERS.CHARACTERS, 4)),
      weapon: from(this._qbService.getCurrentPity(userId, BANNERS.WEAPONS, 5)),
      standard5: from(this._qbService.getCurrentPity(userId, BANNERS.STANDARD, 5)),
      standard4: from(this._qbService.getCurrentPity(userId, BANNERS.STANDARD, 4))
    }).pipe(
      map((res) => {
        return {
          character: { five: res.char5, four: res.char4 },
          weapon: { five: res.weapon },
          standard: { five: res.standard5, four: res.standard4 }
        };
      })
    );
  }

  getFiveStarHistory(userId: number): Observable<IFiveStarHistory> {
    return forkJoin({
      c: from(this._retrieveFiveStarsHistory(userId, BANNERS.CHARACTERS)),
      w: from(this._retrieveFiveStarsHistory(userId, BANNERS.WEAPONS)),
      s: from(this._retrieveFiveStarsHistory(userId, BANNERS.STANDARD))
    }).pipe(
      map((res) => {
        return {
          characters: res.c,
          weapons: res.w,
          standard: res.s
        };
      })
    );
  }

  async getBarChartData(userId: number): Promise<IMonthlyBarChart[]> {
    const dbData: IMonthBarDB[] = await this._qbService.getChartValues(userId);
    const parsed: IMonthlyBarChart[] = [];
    const months: string[] = [];

    dbData.forEach((el) => {
      if (!months.find((f) => f === el.Month)) {
        months.push(el.Month);
      }
    });

    months.forEach((el: string) => {
      parsed.push({
        date: el,
        wishes: {
          r3: Number(dbData.find((f: IMonthBarDB) => f.Month === el && f.Rarity === 3)?.Total),
          r4: Number(dbData.find((f: IMonthBarDB) => f.Month === el && f.Rarity === 4)?.Total),
          r5: Number(dbData.find((f: IMonthBarDB) => f.Month === el && f.Rarity === 5)?.Total)
        }
      });
    });

    return parsed;
  }

  async importWishExcel(user: number): Promise<ITypeAmount[]> {
    console.log(`=== STARTING WISH EXCEL PARSE FOR USER ${user} ===`);
    return this._importWishService.readExcel();
  }
}
