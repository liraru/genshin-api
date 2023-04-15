import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { STATIC_DATA_CONSTANTS } from 'src/modules/import-static-data/constants';
import { IBowjaCharacter } from 'src/modules/import-static-data/interfaces/bowja-character.interface';

@Injectable()
export class BowjaDataService {
  constructor(private readonly httpService: HttpService) {}

  getAllCharacterNames(): Observable<string[]> {
    return this.httpService
      .get<string[]>(`${STATIC_DATA_CONSTANTS.BOWJA_URL}/characters?query=names&matchAliases=true&matchCategories=true`)
      .pipe(map((result: AxiosResponse<string[]>) => result.data));
  }

  getCharacterDetail(character: string): Observable<IBowjaCharacter> {
    console.log(`>>> RETRIEVING DATA OF ${character}`);
    return this.httpService
      .get<IBowjaCharacter>(`${STATIC_DATA_CONSTANTS.BOWJA_URL}/characters?query=${character}`)
      .pipe(map((result: AxiosResponse<IBowjaCharacter>) => result.data));
  }
}
