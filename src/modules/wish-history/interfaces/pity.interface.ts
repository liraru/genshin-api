export interface IPity {
  character: IRarities;
  weapon: IRarities;
  standard: IRarities;
}

interface IRarities {
  five: number;
  four?: number;
}
