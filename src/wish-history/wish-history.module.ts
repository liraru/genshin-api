import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { wishHistoryProviders } from './wish-history.provider';
import { WishHistoryService } from './wish-history.service';
import { WishHistoryController } from './wish-history.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...wishHistoryProviders, WishHistoryService],
  controllers: [WishHistoryController],
})
export class WishHistoryModule {}
