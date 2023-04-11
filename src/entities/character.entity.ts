import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ENTITIES } from '../config/entity-tagging.constant';

@Entity({ name: ENTITIES.Characters })
export class Character {
  @PrimaryColumn()
  name: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  element: string;

  @Column()
  birthday: string;

  @Column()
  ratity: string;

  @Column()
  gender: string;

  @Column()
  region: string;

  @Column()
  affiliation: string;

  @Column()
  constellation: string;

  @Column()
  weapontype: string;

  @Column()
  substat: string;

  @Column()
  icon: string;

  @Column()
  gacha_splash: string;
}
