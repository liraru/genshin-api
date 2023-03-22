import { WishHistory } from '../wish-history/wish-history.entity';

export const databaseConfig = {
  mysql: {
    type: 'mysql',
    host: 'CHIBIKO',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'genshin',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: false,
    autoLoadEntities: true,
  },
  sqlite: {
    type: 'sqlite',
    database: 'data/genshin.db',
    entities: [WishHistory],
    synchronize: false,
    autoLoadEntities: true,
  },
};
