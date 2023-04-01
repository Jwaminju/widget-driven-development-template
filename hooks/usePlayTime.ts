import {get, onValue, set, update} from "firebase/database";
import {useEffect, useRef, useState} from "react";
import {ItemDataInterface} from "../models/items.interface";
import {GameState} from "../models/gamestate.types";
import {actionCountRef, gameStateRef, phaseRef, playTimeRef} from "./utils/dbRefs";

export const usePlayTime = () => {
  const [playTime, setPlayTime] = useState(2023);

  useEffect(() => {
    onValue(playTimeRef(), (snapshot) => {
      if (!snapshot.exists()) return;
      const playtime = snapshot.val();
      setPlayTime(playtime);
    })
  }, []);

  return {playTime}
}

export const updatePlayTimeOnDB = (newPlayTime?: number) => {
  set(playTimeRef(), newPlayTime || 2023);
}