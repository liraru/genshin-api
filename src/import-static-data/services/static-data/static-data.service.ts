import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from 'src/entities/character.entity';
import { Repository } from 'typeorm';
import { BowjaDataService } from '../bowja-data/bowja-data.service';
import { map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IBowjaCharacter } from '../../interfaces/bowja-character.interface';

@Injectable()
export class StaticDataService {
  constructor(
    @InjectRepository(Character) private charactersRepo: Repository<Character>,
    private readonly bowjaDataService: BowjaDataService
  ) {}

  async importCharacters() {
    const charactersDB: Character[] = await this.charactersRepo.find();
    let notParsedCharacters: string[] = [];
    console.log('Characters in DB');
    console.log(charactersDB);

    this.bowjaDataService
      .getAllCharacterNames()
      .pipe(
        map((results: string[]) => {
          notParsedCharacters = [];
          results.forEach((el: string) => {
            if (!charactersDB.find((f) => f.name === el)) {
              notParsedCharacters.push(el);
            }
          });
          return notParsedCharacters;
        }),
        mergeMap((chars: string[]) => {
          const allRequest: Observable<IBowjaCharacter>[] = [];
          chars.forEach((char: string) => {
            allRequest.push(this.bowjaDataService.getCharacterDetail(char));
          });
          return allRequest;
        })
      )
      .subscribe((charNames: any) => {
        console.log('character names on bowja');
        console.log(charNames);
      });
  }
}
