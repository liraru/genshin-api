import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ENTITIES } from '../config/entity-tagging.constant';
import { Character } from './character.entity';

@Entity({ name: ENTITIES.WishHistory })
export class WishHistory {
  @PrimaryGeneratedColumn()
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

  @OneToOne(() => Character, (char) => char.name)
  @JoinColumn({name: `Name`, referencedColumnName: `name`})
  Image?: Character;
}
