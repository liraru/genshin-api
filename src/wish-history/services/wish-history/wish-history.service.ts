import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, forkJoin, from, map } from 'rxjs';
import { WishHistory } from 'src/entities/wish-history.entity';
import { BANNERS } from 'src/wish-history/constants';
import { IPity } from 'src/wish-history/interfaces/pity.interface';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class WishHistoryService {
  constructor(
    @InjectRepository(WishHistory)
    private wishHistoryRepo: Repository<WishHistory>,
    private readonly _dataSource: DataSource
  ) {}

  async findAll(): Promise<WishHistory[]> {
    return await this.wishHistoryRepo.find();
  }

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
      .andWhere(`pityQB.rarity = ${rarity}`)
      .andWhere(`pityQB.Time > '${lastFiveStarQB?.Time ?? '2020'}'`)
      .getRawOne();

    return pityQB?.count ?? 0;
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
}
