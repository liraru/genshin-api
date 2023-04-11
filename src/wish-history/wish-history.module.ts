import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishHistoryController } from './wish-history.controller';
import { WishHistory } from '../entities/wish-history.entity';
import { WishHistoryService } from './services/wish-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([WishHistory])],
  providers: [WishHistoryService],
  controllers: [WishHistoryController],
  exports: [TypeOrmModule]
})
export class WishHistoryModule {}
