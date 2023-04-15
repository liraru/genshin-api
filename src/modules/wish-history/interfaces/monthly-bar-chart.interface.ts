export interface IMonthlyBarChart {
  date: string;
  wishes: IMonthBar;
}

export interface IMonthBar {
  r3: number;
  r4: number;
  r5: number;
}

export interface IMonthBarDB {
  Month: string;
  Rarity: number;
  Total: number;
}
