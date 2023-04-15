import { CONSTANTS } from 'src/constants';
import { WishHistory } from 'src/entities/wish-history.entity';
import { DataSource } from 'typeorm';

export const wishHistoryProviders = [
  {
    provide: CONSTANTS.WISH_HISTORY_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(WishHistory),
    inject: [CONSTANTS.DATA_SOURCE],
  },
];
