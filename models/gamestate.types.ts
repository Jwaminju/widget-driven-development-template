export interface GameState {
  "username": string;
  "playtime": number;
  "greenHouseGases": GreenHouseGases;
  "items": Items;
}

export type SerializedGas = {
  "type": string,
  "concentration": number,
}
export type GreenHouseGases = SerializedGas[];
export type Item = {
  "name": string;
  "isActivated": boolean;
}

export interface Items {
  "personal": Item[];
  "enterprise": Item[];
  "national": Item[];
}

export type GreenHouseGasType = "co2" | "n2o" | "ch4" | "cfcs";
export type ItemState = {
  "person": number[],
  "enterprise": number[],
  "country": number[]
}