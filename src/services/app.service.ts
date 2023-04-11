import { Injectable, OnModuleInit } from '@nestjs/common';
import { StaticDataService } from '../import-static-data/services/static-data/static-data.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly _staticDataService: StaticDataService) {}

  onModuleInit() {
    console.log('Initializing AppService...');

    console.log('Launch characters import...');
    this._staticDataService.importCharacters();
  }
}
