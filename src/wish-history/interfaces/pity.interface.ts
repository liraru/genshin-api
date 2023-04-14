export interface IPity {
  character: IRarities;
  weapon: IRarities;
  standard: IRarities;
}

interface IRarities {
  four?: number;
  five: number;
}
