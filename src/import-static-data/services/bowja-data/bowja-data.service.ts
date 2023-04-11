import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { IBowjaCharacter } from '../../interfaces/bowja-character.interface';

const BOWJA = 'https://genshin-db-api.vercel.app/api';

@Injectable()
export class BowjaDataService {
  constructor(private readonly httpService: HttpService) {}

  getAllCharacterNames(): Observable<AxiosResponse<string[]>> {
    return this.httpService.get(`${BOWJA}/characters?query=names&matchAliases=true&matchCategories=true`);
  }

  getCharacterDetail(character: string): Observable<AxiosResponse<IBowjaCharacter>> {
    return this.httpService.get(`${BOWJA}/characters?query=${character}`);
  }
}
