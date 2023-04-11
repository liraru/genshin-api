import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { databaseConfig } from './config/database.config';
import { ImportStaticDataModule } from './import-static-data/import-static-data.module';
import { AppService } from './services/app.service';
import { UsersModule } from './users/users.module';
import { WishHistoryModule } from './wish-history/wish-history.module';

@Module({
  imports: [
    UsersModule,
    ImportStaticDataModule,
    WishHistoryModule,
    TypeOrmModule.forRoot(databaseConfig.mysql as TypeOrmModuleOptions)
  ],
  controllers: [],
  providers: [AppService]
})
export class AppModule implements OnModuleInit {
  constructor(private readonly appService: AppService, private dataSource: DataSource) {}
  onModuleInit() {
    console.log('Initializing API');
  }
}
