import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, forkJoin, from, map } from 'rxjs';
import { WishHistory } from 'src/entities/wish-history.entity';
import { BANNERS, STANDARD_CHARACTERS } from 'src/modules/wish-history/constants';
import { Repository } from 'typeorm';
import { WishHistoryQueryBuildersService } from '../wish-history-query-builders/wish-history-query-builders.service';
import { IFiveStarHistory, IFiveStarRoll } from '../../interfaces/five-star-history.interface';
import { IPity } from '../../interfaces/pity.interface';

@Injectable()
export class WishHistoryService {
  constructor(
    @InjectRepository(WishHistory)
    private _wishHistoryRepo: Repository<WishHistory>,
    private readonly _qbService: WishHistoryQueryBuildersService
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

  private async _retrieveFiveStarsHistory(banner: string) {
    const fiveStarPullQB = await this._qbService.getFiveStarsHistory(banner);
    const fiveStarPulls: IFiveStarRoll[] = [];
    let lossCount = 0;

    fiveStarPullQB?.forEach((el: WishHistory) => {
      lossCount = lossCount === 2 ? 0 : lossCount;
      const roll: IFiveStarRoll = {
        name: el.Name,
        pity: el.Pity,
        fiftyWon: this._checkFiftyWon(el.Name, el.Time, lossCount !== 1, banner),
        date: el.Time,
        image: banner === BANNERS.CHARACTERS ? '' : undefined
      };
      fiveStarPulls.push(roll);
      lossCount = roll.fiftyWon ? 0 : lossCount + 1;
    });

    return fiveStarPulls;
  }

  async findAll(): Promise<WishHistory[]> {
    return await this._wishHistoryRepo.find();
  }

  getPity(): Observable<IPity> {
    return forkJoin({
      char5: from(this._qbService.getCurrentPity(BANNERS.CHARACTERS, 5)),
      char4: from(this._qbService.getCurrentPity(BANNERS.CHARACTERS, 4)),
      weapon: from(this._qbService.getCurrentPity(BANNERS.WEAPONS, 5)),
      standard5: from(this._qbService.getCurrentPity(BANNERS.STANDARD, 5)),
      standard4: from(this._qbService.getCurrentPity(BANNERS.STANDARD, 4))
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

  getFiveStarHistory(): Observable<IFiveStarHistory> {
    return forkJoin({
      c: from(this._retrieveFiveStarsHistory(BANNERS.CHARACTERS)),
      w: from(this._retrieveFiveStarsHistory(BANNERS.WEAPONS)),
      s: from(this._retrieveFiveStarsHistory(BANNERS.STANDARD))
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
}
