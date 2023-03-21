import { DataSource } from 'typeorm';
import { CONSTANTS } from '../constants';

export const databaseProviders = [
  {
    provide: CONSTANTS.DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'sqlite',
        database: '/data/genshin.db',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];
