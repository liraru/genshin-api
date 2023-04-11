import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishHistoryController } from './wish-history.controller';
import { WishHistory } from '../entities/wish-history.entity';
import { WishHistoryService } from './services/wish-history/wish-history.service';
import { AutoImportWishService } from './services/auto-import-wish/auto-import-wish.service';

@Module({
  imports: [TypeOrmModule.forFeature([WishHistory])],
  providers: [WishHistoryService, AutoImportWishService],
  controllers: [WishHistoryController],
  exports: [TypeOrmModule, AutoImportWishService]
})
export class WishHistoryModule {}
