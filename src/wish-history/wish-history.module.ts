import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishHistory } from '../entities/wish-history.entity';
import { AutoImportWishService } from './services/auto-import-wish/auto-import-wish.service';
import { WishHistoryQueryBuildersService } from './services/wish-history-query-builders/wish-history-query-builders.service';
import { WishHistoryService } from './services/wish-history/wish-history.service';
import { WishHistoryController } from './wish-history.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WishHistory])],
  providers: [WishHistoryService, AutoImportWishService, WishHistoryQueryBuildersService],
  controllers: [WishHistoryController],
  exports: [TypeOrmModule, AutoImportWishService]
})
export class WishHistoryModule {}
