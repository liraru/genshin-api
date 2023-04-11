import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BowjaDataService } from './services/bowja-data/bowja-data.service';

@Module({
  imports: [HttpModule],
  providers: [BowjaDataService],
})
export class ImportStaticDataModule {}
