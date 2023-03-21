import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishHistoryController } from './wish-history.controller';
import { wishHistoryProviders } from './wish-history.provider';
import { WishHistoryService } from './wish-history.service';

@Module({
  imports: [TypeOrmModule],
  providers: [
    // ...wishHistoryProviders, 
    WishHistoryService
  ],
  controllers: [WishHistoryController],
})
export class WishHistoryModule {}
