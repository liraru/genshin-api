export interface IPity {
  character: IRarities;
  weapon: IRarities;
  standard: IRarities;
}

interface IRarities {
  four?: number;
  five: number;
}

export interface IFiveStarHistory {
  characters: IFiveStarPity[];
  weapons: IFiveStarPity[];
  standard: IFiveStarPity[];
}
export interface IFiveStarPity {
  name: string;
  pity: number;
  fiftyWon: boolean;
}