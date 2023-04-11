import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BowjaDataService } from './services/bowja-data/bowja-data.service';
import { StaticDataService } from './services/static-data/static-data.service';
import { Character } from '../entities/character.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Character])],
  providers: [BowjaDataService, StaticDataService],
  exports: [TypeOrmModule, StaticDataService]
})
export class ImportStaticDataModule {}
