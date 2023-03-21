import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class WishHistory {
  @PrimaryColumn('text')
  Banner: string;

  @Column('text')
  Type: string;

  @Column('text')
  Name: string;

  @Column('text')
  Time: string;

  @Column('integer')
  Rarity: number;

  @Column('text')
  Pity: string;

  @Column('integer')
  Roll: string;

  @Column('integer')
  Group: string;

  @Column('text')
  Title: string;

  @Column('text')
  Part: string;
}
