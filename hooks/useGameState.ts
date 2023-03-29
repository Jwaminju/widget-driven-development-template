import {calculateGreenHouseEffect, defaultGreenHouseGases, GasFactory} from "../models/greenhousegas";
import {useEffect, useMemo, useState} from "react";
import {auth, database} from "./useFirebase";
import {onValue, ref, set, update} from "firebase/database";

export interface GameStateData {
  "gamestate": GameState
}

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
export const defaultGameState = {
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

const greenHouseGasNames = ["co2", "n2o", "ch4", "cfcs"];

// 이 디폴트 값이 디비에서 조회한 값이 됩니다.
// 값이 없으면(조회된) 디비에 기본 값을 생성하고 기본값을 사용합니다.

export const usePlayTime = () => {
  const playTimeRef = ref(database, auth.currentUser?.uid + "/playtime");
  const [playTime, setPlayTime] = useState(2023);
  useEffect(() => {
    onValue(playTimeRef, (snapshot) => {
      const playtime = snapshot.val();
      if (playtime) {setPlayTime(playtime)}
      else if (auth.currentUser?.uid) {set(playTimeRef, 2023)}
    })
  }, []);

  useEffect(() => {
    set(ref(database, auth.currentUser?.uid + "/playtime"), playTime);
  }, [playTime]);

  return {playTime, setPlayTime}
}

export const useGreenHouseGases = () => {
  const greenHouseGasesRef = ref(database, auth.currentUser?.uid + "/greenHouseGases");
  const [greenHouseGases, setGreenHouseGases] = useState(defaultGreenHouseGases);
  const greenHouseEffect = useMemo(() => calculateGreenHouseEffect(greenHouseGases), [greenHouseGases]);
  const changeRates = useMemo(() => {
    const lastChangeRates = greenHouseGases.map(gas => gas.lastChangeRate);
    return new Map(greenHouseGasNames.map((name,index )=> [name, lastChangeRates[index]]));
  }, [greenHouseGases]);

  useEffect(() => {
    onValue(greenHouseGasesRef, (snapshot) => {
      const greenHouseGases = snapshot.val();
      if (greenHouseGases) {setGreenHouseGases(new GasFactory().deserializeGases(greenHouseGases))}
      else if (auth.currentUser?.uid) {set(greenHouseGasesRef, defaultGameState.greenHouseGases)}
    })
  }, []);

  useEffect(() => {
    update(ref(database, auth.currentUser?.uid), {
      greenHouseGases: greenHouseGases.map(greenHouseGas => ({type: greenHouseGas.name, concentration: greenHouseGas.concentration}))
    })
  }, [greenHouseGases]);

  return {greenHouseGases, setGreenHouseGases, greenHouseEffect, changeRates};
}

// const actionItems = atom<ItemDataInterface[] | null>({
//   key: "items",
//   default: null
// })
