import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { dbConfig } from './database/database.config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { WishHistoryModule } from './wish-history/wish-history.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    WishHistoryModule,
    TypeOrmModule.forRoot(dbConfig),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
