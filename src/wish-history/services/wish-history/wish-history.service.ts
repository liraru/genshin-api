import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, forkJoin, from, map } from 'rxjs';
import { WishHistory } from 'src/entities/wish-history.entity';
import { BANNERS, STANDARD_CHARACTERS } from 'src/wish-history/constants';
import { IFiveStarHistory, IFiveStarPity, IPity } from 'src/wish-history/interfaces/pity.interface';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class WishHistoryService {
  constructor(
    @InjectRepository(WishHistory)
    private _wishHistoryRepo: Repository<WishHistory>,
    private readonly _dataSource: DataSource
  ) {}

  private async _retrievePityFromDB(banner: string, rarity: number): Promise<number> {
    /*
      SELECT COUNT(Name) AS Pity FROM user_wish_history uwh 
      WHERE Banner = 'Character Event'
        AND Time > (
          SELECT Time 
          FROM user_wish_history uwh 
          WHERE banner = 'Character Event' AND Rarity = 5 
          ORDER BY Time DESC, id DESC LIMIT 1)
    */
    const lastFiveStarQB = await this._dataSource
      .getRepository(WishHistory)
      .createQueryBuilder('pityQBSubquery')
      .select('pityQBSubquery.Time')
      .where(`pityQBSubquery.banner = '${banner}'`)
      .andWhere(`pityQBSubquery.rarity = ${rarity}`)
      .orderBy('pityQBSubquery.Time', 'DESC')
      .limit(1)
      .getOne();

    const pityQB = await this._dataSource
      .getRepository(WishHistory)
      .createQueryBuilder('pityQB')
      .select('COUNT(pityQB.Name)', 'count')
      .where(`pityQB.banner = '${banner}'`)
      .andWhere(`pityQB.Time > '${lastFiveStarQB?.Time ?? '2020'}'`)
      .getRawOne();

    return pityQB?.count ?? 0;
  }

  private _checkFiftyWon(character: string, date: string, previousWon: boolean): boolean {
    const standard = STANDARD_CHARACTERS.find((f) => f.character === character);
    
    if ((!previousWon && standard) || (standard?.character === character && (standard?.promoReleaseEnd ?? '2020' > date))) {
      return false;
    }
    return true;
  }

  private async _retrieveFiveStarsHistory(banner: string) {
    /*
        SELECT Name, Pity, Time FROM user_wish_history uwh 
        WHERE Rarity = 5 AND Banner = 'Character Event' 
        ORDER BY `Time` DESC
    */

    const fiveStarPullQB = await this._dataSource
      .getRepository(WishHistory)
      .createQueryBuilder('fiveStarPullQB')
      .where(`fiveStarPullQB.Rarity = 5 AND fiveStarPullQB.Banner = '${banner}'`)
      .orderBy(`fiveStarPullQB.Time`, `ASC`)
      .getMany();

    const fiveStarPulls: IFiveStarPity[] = [];
    let previousRollWon: boolean;

    fiveStarPullQB?.forEach((el: WishHistory) => {
      const roll = {
        name: el.Name,
        pity: el.Pity,
        fiftyWon: this._checkFiftyWon(el.Name, el.Time, previousRollWon)
      };
      fiveStarPulls.push(roll);
      previousRollWon = roll.fiftyWon;
    });

    return fiveStarPulls;
  }

  async findAll(): Promise<WishHistory[]> {
    return await this._wishHistoryRepo.find();
  }

  getPity(): Observable<IPity> {
    return forkJoin({
      char5: from(this._retrievePityFromDB(BANNERS.CHARACTERS, 5)),
      char4: from(this._retrievePityFromDB(BANNERS.CHARACTERS, 4)),
      weapon: from(this._retrievePityFromDB(BANNERS.WEAPONS, 5)),
      standard5: from(this._retrievePityFromDB(BANNERS.STANDARD, 5)),
      standard4: from(this._retrievePityFromDB(BANNERS.STANDARD, 4))
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
