import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ENTITIES } from '../config/entity-tagging.constant';

@Entity({ name: ENTITIES.WishHistory })
export class WishHistory {
  @PrimaryColumn()
  id?: number;
  
  @Column()
  user_id: number;

  @Column()
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
  Pity: number;

  @Column()
  Roll: number;

  @Column()
  Group: number;

  @Column()
  Title: string;

  @Column()
  Part: string;
}
