import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { WishHistory } from '../wish-history/wish-history.entity';

export const dbConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'data/genshin.db',
  entities: [WishHistory],
  synchronize: false,
};
