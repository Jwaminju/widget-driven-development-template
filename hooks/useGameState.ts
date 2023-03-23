import {atom, selector} from "recoil";
import {GasFactory} from "../models/greenhousegas";

export interface GameStateData {
  "gamestate": GameState
}

export interface GameState {
  "id": number;
  "username": string;
  "playtime": number;
  "greenhouseeffect": number;
  "greenhousegases": GreenHouseGases;
  "items": Items;
}
export type Gas = {
  "type": string,
  "measurement": number
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

export const useGameState = (gameStateData: GameStateData) => {
//   게임 데이터는 페이지 단위에서 가져옴
//   현재 스테이트(상태)랑 동기화 하기
  const gameState = atom<GameStateData>({
    key: "gameState",
    default: gameStateData
  });

  const userInfo = selector({
    key: "userInfo",
    get: ({get}) => {
      const currentGameState = get(gameState)["gamestate"];
      return { id: currentGameState["id"], username: currentGameState["username"]};
    }
  });

  const playTime = selector({
    key: "playtime",
    get: ({get}) => {
      const currentGameState = get(gameState)["gamestate"];
      return currentGameState["playtime"];
    }
  })

  const greenHouseEffect = selector({
    key: "greenHouseEffect",
    get: ({get}) => {
      const currentGameState = get(gameState)["gamestate"];
      return currentGameState["greenhouseeffect"];
    }
  })

  const greenHouseGases = selector({
    key: "greenHouseGases",
    get: ({get}) => {
      const greenhousegases = Object(get(gameState)["gamestate"]["greenhousegases"]);
      const gasFactory: GasFactory = new GasFactory();
      return greenhousegases.map((gas: Gas) => gasFactory.createGas(gas["type"], gas["measurement"]));
    }
  })

  const items = selector({
    key: "items",
    get: ({get}) => {
      const items: Items = get(gameState)["gamestate"]["items"];
      return items;
    }
  })

  return { currentGameState: gameState, userInfo, playTime, greenHouseEffect, greenHouseGases, items }
}