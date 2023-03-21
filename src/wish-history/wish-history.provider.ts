import { DataSource } from 'typeorm';
import { CONSTANTS } from '../constants';
import { WishHistory } from './wish-history.entity';

export const wishHistoryProviders = [
  {
    provide: CONSTANTS.WISH_HISTORY_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(WishHistory),
    inject: [CONSTANTS.DATA_SOURCE],
  },
];
