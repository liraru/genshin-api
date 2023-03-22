import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ENTITIES } from '../config/entity-tagging.constant';

@Entity({ name: ENTITIES.WishHistory })
export class WishHistory {
  @PrimaryColumn()
  Banner: string;

  @Column()
  Type: string;

  @Column()
  Name: string;

  @Column()
  Time: string;

  @Column()
  Rarity: number;

  @Column()
  Pity: string;

  @Column()
  Roll: string;

  @Column()
  Group: string;

  @Column()
  Title: string;

  @Column()
  Part: string;
}
