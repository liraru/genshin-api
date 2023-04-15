import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WishHistory } from 'src/entities/wish-history.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class WishHistoryQueryBuildersService {
  constructor(
    @InjectRepository(WishHistory)
    private _wishHistoryRepo: Repository<WishHistory>,
    private readonly _dataSource: DataSource
  ) {}

  async getCurrentPity(banner: string, rarity: number): Promise<number> {
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

  getFiveStarsHistory(banner: string): Promise<WishHistory[]> {
    /*
        SELECT Name, Pity, Time FROM user_wish_history uwh 
        WHERE Rarity = 5 AND Banner = 'Character Event' 
        ORDER BY `Time` DESC
    */

    return this._dataSource
      .getRepository(WishHistory)
      .createQueryBuilder('fiveStarPullQB')
      .where(`fiveStarPullQB.Rarity = 5 AND fiveStarPullQB.Banner = '${banner}'`)
      .orderBy(`fiveStarPullQB.Time`, `ASC`)
      .getMany();
  }
}
