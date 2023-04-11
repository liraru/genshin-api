import { Injectable, OnModuleInit } from '@nestjs/common';
import { StaticDataService } from 'src/import-static-data/services/static-data/static-data.service';
import { AutoImportWishService } from 'src/wish-history/services/auto-import-wish/auto-import-wish.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly _staticDataService: StaticDataService,
    private readonly _autoImportWishService: AutoImportWishService
  ) {}

  onModuleInit() {
    console.log('>>>>> Initializing AppService <<<<<');

    console.log('### Launch characters import ###');
    this._staticDataService.importCharacters();

    console.log('### Launch wish history import ###');
    this._autoImportWishService.readExcel();
  }
}
