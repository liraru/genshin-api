import { Module } from '@nestjs/common';
import {
  TypeOrmModule,
  TypeOrmModuleOptions
} from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { databaseConfig } from './config/database.config';
import { UsersModule } from './users/users.module';
import { WishHistoryModule } from './wish-history/wish-history.module';
import { ImportStaticDataModule } from './import-static-data/import-static-data.module';

@Module({
  imports: [
    UsersModule,
    ImportStaticDataModule,
    WishHistoryModule,
    TypeOrmModule.forRoot(databaseConfig.mysql as TypeOrmModuleOptions),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
