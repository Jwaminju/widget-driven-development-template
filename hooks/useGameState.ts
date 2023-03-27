import {GasFactory} from "../models/greenhousegas";
import {atom} from "recoil";

export interface GameStateData {
  "gamestate": GameState
}

export interface GameState {
  "username": string;
  "playtime": number;
  "greenHouseGases": GreenHouseGases;
  "items": Items;
}

export type Gas = {
  "type": string,
  "concentration": number,
}

export type GreenHouseGases = Gas[];

export type Item = {
  "name": string;
  "isActivated": boolean;
}
export interface Items {
  "personal": Item[];
  "enterprise": Item[];
  "national": Item[];
}
export const defaultGameState = {
  "name": "username",
  "playtime": 2023,
  "greenHouseGases": [
    {
      "type": "co2",
      "concentration": 0.0415
    },
    {
      "type": "n2o",
      "concentration": 0.0000332
    },
    {
      "type": "ch4",
      "concentration": 0.000187
    },
    {
      "type": "cfcs",
      "concentration": 0.0000000385
    }
  ],
  "items": [
    {
      "name": 'Riding public transportation',
      "isActivated": false,
    }
  ]
}

export const useGameState = (gameState: GameState) => {
//   게임 데이터는 페이지 단위에서 가져옴
//   현재 스테이트(상태)랑 동기화 하기
//   const {getGameStateFromDB, updateGameState, createGameState} = useRealtimeDB();
  const {username, playtime, greenHouseGases, items} = Object(JSON.stringify(defaultGameState));
  const gamestate = atom<GameState>({
    key: "gameState",
    default: gameState
  });

  const playTime = selector({
    key: "playtime",
    get: ({get}) => {
      const currentGameState = get(gamestate);
      return currentGameState["playtime"];
    }
  })

  const greenHouseGases = selector({
    key: "greenHouseGases",
    get: ({get}) => {
      const greenhousegases = Object(get(gamestate)["greenHouseGases"]);
      const gasFactory: GasFactory = new GasFactory();
      return greenhousegases.map((gas: Gas) => gasFactory.createGas(gas["type"], gas["concentration"]));
    }
  })

  const items = selector({
    key: "items",
    get: ({get}) => {
      const items: Items = get(gamestate)["items"];
      return items;
    }
  })

  return { greenHouseGases, greenHouseEffect, changeRates, items }
}