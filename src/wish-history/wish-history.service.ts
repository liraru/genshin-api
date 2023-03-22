import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WishHistory } from './wish-history.entity';

@Injectable()
export class WishHistoryService {
  constructor(
    @InjectRepository(WishHistory)
    private wishHistoryRepo: Repository<WishHistory>,
  ) {}

  async findAll(): Promise<WishHistory[]> {
    return await this.wishHistoryRepo.find();
  }
}
