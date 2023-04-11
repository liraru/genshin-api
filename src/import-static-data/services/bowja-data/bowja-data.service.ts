import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IBowjaCharacter } from '../../interfaces/bowja-character.interface';

const BOWJA = 'https://genshin-db-api.vercel.app/api';

@Injectable()
export class BowjaDataService {
  constructor(private readonly httpService: HttpService) {}

  getAllCharacterNames(): Observable<string[]> {
    return this.httpService
      .get<string[]>(`${BOWJA}/characters?query=names&matchAliases=true&matchCategories=true`)
      .pipe(map((result: AxiosResponse<string[]>) => result.data));
  }

  getCharacterDetail(character: string): Observable<IBowjaCharacter> {
    console.log(`>>> RETRIEVING DATA OF ${character}`);
    return this.httpService
      .get<IBowjaCharacter>(`${BOWJA}/characters?query=${character}`)
      .pipe(map((result: AxiosResponse<IBowjaCharacter>) => result.data));
  }
}
