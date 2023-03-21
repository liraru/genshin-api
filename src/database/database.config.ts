import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { WishHistory } from '../wish-history/wish-history.entity';

export const dbConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'data/genshin.db',
  // entities: [WishHistory],
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
  autoLoadEntities: true
};
