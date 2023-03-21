import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { WishHistoryModule } from './wish-history/wish-history.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    WishHistoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
