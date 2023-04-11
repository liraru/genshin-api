import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Character } from 'src/entities/character.entity';
import { Repository } from 'typeorm';
import { IBowjaCharacter } from '../../interfaces/bowja-character.interface';
import { BowjaDataService } from '../bowja-data/bowja-data.service';
import { STATIC_DATA_CONSTANTS } from '../../constants';
@Injectable()
export class StaticDataService {
  constructor(
    @InjectRepository(Character) private charactersRepo: Repository<Character>,
    private readonly bowjaDataService: BowjaDataService
  ) {}

  private parseBowjaToLocal(bowja: IBowjaCharacter): Character {
    return {
      name: bowja.name,
      title: bowja.title,
      description: bowja.description,
      element: bowja.element,
      birthday: bowja.birthdaymmdd,
      ratity: bowja.rarity,
      gender: bowja.gender,
      region: bowja.region,
      affiliation: bowja.affiliation,
      constellation: bowja.constellation,
      weapontype: bowja.weapontype,
      substat: bowja.substat,
      icon: bowja.images.icon,
      icon_item: `${STATIC_DATA_CONSTANTS.BOWJA_GALLERY_PATH}/${STATIC_DATA_CONSTANTS.ICON_ITEM_PATH}/${bowja.images.nameiconcard}`,
      icon_party: bowja.images.sideicon,
      gacha_splash: ``,
      gacha_multi: ``
    };
  }

  private async saveOnDB(character: IBowjaCharacter) {
    console.log('>>> INSERT', this.parseBowjaToLocal(character));
    await this.charactersRepo.insert(this.parseBowjaToLocal(character));
  }

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
          chars.forEach((char: string) => allRequest.push(this.bowjaDataService.getCharacterDetail(char)));
          return forkJoin(allRequest);
        })
      )
      .subscribe((characterList: IBowjaCharacter[]) =>
        characterList.forEach((el: IBowjaCharacter) => this.saveOnDB(el))
      );
  }
}
