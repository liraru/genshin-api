export interface IFiveStarHistory {
  characters: IFiveStarRoll[];
  weapons: IFiveStarRoll[];
  standard: IFiveStarRoll[];
}

export interface IFiveStarRoll {
  name: string;
  date: string;
  pity: number;
  fiftyWon: boolean;
  image?: string;
}
