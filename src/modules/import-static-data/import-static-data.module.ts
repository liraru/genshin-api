import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from 'src/entities/character.entity';
import { BowjaDataService } from './services/bowja-data/bowja-data.service';
import { StaticDataService } from './services/static-data/static-data.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Character])],
  providers: [BowjaDataService, StaticDataService],
  exports: [TypeOrmModule, StaticDataService]
})
export class ImportStaticDataModule {}
