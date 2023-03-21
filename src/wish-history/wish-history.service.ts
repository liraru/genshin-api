import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CONSTANTS } from '../constants';
import { WishHistory } from './wish-history.entity';

@Injectable()
export class WishHistoryService {
  constructor(
    @Inject(CONSTANTS.WISH_HISTORY_REPOSITORY)
    private wishHistoryRepo: Repository<WishHistory>,
  ) {}

  async findAll(): Promise<WishHistory[]> {
    return await this.wishHistoryRepo.find();
  }
}
