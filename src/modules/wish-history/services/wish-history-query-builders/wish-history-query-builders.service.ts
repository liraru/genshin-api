import { Injectable } from '@nestjs/common';
import { Character } from 'src/entities/character.entity';
import { WishHistory } from 'src/entities/wish-history.entity';
import { DataSource } from 'typeorm';
import { IMonthBarDB } from '../../interfaces/monthly-bar-chart.interface';

@Injectable()
export class WishHistoryQueryBuildersService {
  constructor(private readonly _dataSource: DataSource) {}

  async getCurrentPity(userId: number, banner: string, rarity: number): Promise<number> {
    /*
        SELECT COUNT(Name) AS Pity FROM user_wish_history uwh 
        WHERE Banner = 'Character Event'
          AND Time > (
            SELECT Time 
            FROM user_wish_history uwh 
            WHERE banner = 'Character Event' AND Rarity = 5 AND user_id = 1
            ORDER BY Time DESC, id DESC LIMIT 1)
      */
    const lastFiveStarQB = await this._dataSource
      .getRepository(WishHistory)
      .createQueryBuilder('uwh')
      .select('uwh.Time')
      .where(`uwh.banner = '${banner}'`)
      .andWhere(`uwh.rarity = ${rarity}`)
      .andWhere(`uwh.user_id = ${userId}`)
      .orderBy('uwh.Time', 'DESC')
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

  getFiveStarsHistory(userId: number, banner: string): Promise<WishHistory[]> {
    /*
        SELECT uwh.Name, uwh.Pity, uwh.Time, uwh.Type, c.icon
        FROM user_wish_history uwh
        INNER JOIN `characters` c ON C.name = uwh.Name
          WHERE uwh.Rarity = 5 AND uwh.Banner = 'Character Event' AND uwh.user_id = 1
        ORDER BY `Time` ASC
    */
    return this._dataSource
      .getRepository(WishHistory)
      .createQueryBuilder('uwh')
      .leftJoinAndSelect(Character, `char`, `char.name = uwh.Name`)
      .select(`uwh.Name, uwh.Pity, uwh.Time, uwh.Type, char.icon`)
      .where(`uwh.Rarity = 5 AND uwh.Banner = '${banner}'`)
      .andWhere(`uwh.user_id = ${userId}`)
      .orderBy(`uwh.Time`, `ASC`)
      .getRawMany();
  }

  getChartValues(userId: number): Promise<IMonthBarDB[]> {
    /*
        SELECT SUBSTRING(Time, 1, 7) `Month`, Rarity, COUNT(*) `Total`
        FROM user_wish_history uwh 
        WHERE user_id = 1
        GROUP BY Month, Rarity 
        ORDER BY Month, Rarity    
    */
    return this._dataSource
      .getRepository(WishHistory)
      .createQueryBuilder('uwh')
      .select(`SUBSTRING(Time, 1, 7) 'Month', Rarity, COUNT(*) 'Total'`)
      .where(`user_id = ${userId}`)
      .groupBy(`Month`)
      .addGroupBy(`Rarity`)
      .orderBy(`Month`, `ASC`)
      .addOrderBy(`Rarity`, `ASC`)
      .getRawMany();
  }
}
