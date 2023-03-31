import {ActionCount} from "../hooks/usePlayTime";

export interface GameState {
  "playtime": number;
  "greenHouseGases": GreenHouseGases;
  "items": Items;
  "actionCount": ActionCount;
}

export type SerializedGas = {
  "type": string,
  "concentration": number,
  "lastChangeRate": number,
}

export type GreenHouseGases = SerializedGas[];

export type Item = {
  "name": string;
  "isActivated": boolean;
}

export interface Items {
  "personal": Item[];
  "enterprise": Item[];
  "country": Item[];
}

export type GreenHouseGasType = "co2" | "n2o" | "ch4" | "cfcs";

export type ItemState = {
  "person": number[],
  "enterprise": number[],
  "country": number[]
}