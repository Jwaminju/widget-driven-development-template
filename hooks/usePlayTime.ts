import { get, onValue, set, update } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import { GameState } from "../models/gamestate.types";
import { ItemDataInterface } from "../models/items.interface";
import { actionCountRef, gameStateRef, playTimeRef } from "./utils/dbRefs";

export type ActionCount = {
  [index: string]: number;
}
export const defaultActionCount: ActionCount = {
  "person": 1,
  "enterprise": 1,
  "country": 1
}
export const usePlayTime = () => {
  const [playTime, setPlayTime] = useState(2023);
  const actionCountStore = useRef(defaultActionCount);

  useEffect(() => {
    onValue(playTimeRef, (snapshot) => {
      const playtime = snapshot.val();
      if (playtime) {setPlayTime(playtime)}
    })
    onValue(actionCountRef, (snapshot) => {
      const actionCount = snapshot.val();
      if (snapshot) {actionCountStore.current = actionCount;}
    })
  }, []);

  return {playTime}
}

export const updatePlayTimeOnDB = (newPlayTime: number) => {
  if (newPlayTime) {
    set(playTimeRef, newPlayTime);
  }
  else {
    set(playTimeRef, 2023);
  }
}
export const changePlayTime = (actionItem: ItemDataInterface) => {
  const actionType = actionItem.type;
  switch (actionType) {
    case "person":
      update(actionCountRef, {"person": 0})
      break;
    case "enterprise":
      update(actionCountRef, {"enterprise": 0})
      break;
    case "country":
      update(actionCountRef, {"country": 0})
      break;
  }
  get(gameStateRef).then((snapshot) => {
    const gameState = snapshot.val() as GameState;
    const {playtime, actionCount} = gameState;
    const totalCount = Object.values(actionCount).reduce((totalCount, count) => totalCount += count);
    if (totalCount === 0) {
      updatePlayTimeOnDB(playtime + 1);
      set(actionCountRef, defaultActionCount);
    }
  })
}