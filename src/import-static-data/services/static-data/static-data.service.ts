import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Characters } from 'src/entities/character.entity';
import { Repository } from 'typeorm';
import { BowjaDataService } from '../bowja-data/bowja-data.service';

@Injectable()
export class StaticDataService {
  constructor(
    @InjectRepository(Characters) private charactersRepo: Repository<Characters>,
    private readonly bowjaDataService: BowjaDataService
  ) {}

  async importCharacters() {
    const charactersDB: Characters[] = await this.charactersRepo.find();
    console.log(charactersDB);
  }
}
