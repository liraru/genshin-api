import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Characters } from 'src/entities/character.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StaticDataService {
  constructor(
    @InjectRepository(Characters)
    private charactersRepo: Repository<Characters>,
  ) {}
}
