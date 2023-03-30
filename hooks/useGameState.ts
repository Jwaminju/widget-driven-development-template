import { onValue, ref, set } from "firebase/database";
import { useEffect, useMemo, useState } from "react";
import { ItemDataInterface, ItemSelectInterface } from "../data/items.interface";
import {
  calculateGreenHouseEffect, defaultGreenHouseGases,
  GasFactory, GreenHouseGas
} from "../models/greenhousegas";
import { auth, database } from "./useFirebase";

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
const defaultActionCount = {
  "person": 1,
  "enterprise": 1,
  "country": 1
}
export const usePlayTime = () => {
  const playTimeRef = ref(database, auth.currentUser?.uid + "/playtime");
  const [playTime, setPlayTime] = useState(2023);
  const [actionCount, setActionCount] = useState(defaultActionCount);

  useEffect(() => {
    onValue(playTimeRef, (snapshot) => {
      const playtime = snapshot.val();
      if (playtime) {setPlayTime(playtime)}
    })
  }, []);

  const updatePlayTimeOnDB = (newPlayTime: number) => {
    set(ref(database, auth.currentUser?.uid + "/playtime"), newPlayTime);
  }
  const changePlayTime = (actionItem: ItemDataInterface) => {
    const actionType = actionItem.type;
    switch (actionType) {
      case "person":
        setActionCount((prevState) => {
          return {...prevState, person: 0}
        })
        break;
      case "enterprise":
        setActionCount(prevState => {
          return {...prevState, enterprise: 0}
        })
        break;
      case "country":
        setActionCount(prevState => {
          return {...prevState, country: 0}
        })
        break;
    }
    const totalCount = Object.values(actionCount).reduce((totalCount, count) => totalCount += count);
    if ((totalCount === 1 && actionCount.country === 1) || (totalCount === 0)) {
      updatePlayTimeOnDB(playTime+1);
      setActionCount(defaultActionCount);
    }
  }

  return {playTime, changePlayTime}
}

export type GreenHouseGasType = "co2" | "n2o" | "ch4" | "cfcs";
export const greenHouseGasIndex = {
  "co2": 0,
  "n2o": 1,
  "ch4": 2,
  "cfcs": 3
}

export const useGreenHouseGases = () => {
  const greenHouseGasesRef = ref(database, auth.currentUser?.uid + "/greenHouseGases");
  const [greenHouseGases, setGreenHouseGases] = useState(defaultGreenHouseGases);
  const greenHouseEffect = useMemo(() => calculateGreenHouseEffect(greenHouseGases), [greenHouseGases]);
  const changeRates = useMemo(() => {
    const lastChangeRates = greenHouseGases.map(gas => gas.lastChangeRate);
    return new Map(greenHouseGasNames.map((name,index )=> [name, lastChangeRates[index]]));
  }, [greenHouseGases]);
  const [greenHouseEffectChangeRate, setGHCR]= useState(0);

  useEffect(() => {
    onValue(greenHouseGasesRef, (snapshot) => {
      const greenHouseGases = snapshot.val();
      if (greenHouseGases) {setGreenHouseGases(GasFactory.deserializeGases(greenHouseGases))}
    })
  }, []);

  useEffect(() => {
    set(ref(database, auth.currentUser?.uid + "/greenHouseGases"),
      greenHouseGases.map(greenHouseGas => (
        {type: greenHouseGas.name, concentration: greenHouseGas.concentration})));
  }, [greenHouseGases]);

  const updateConcentration = (greenHouseGasType: GreenHouseGasType, concentrationChange: number) => {
    const index = greenHouseGasIndex[greenHouseGasType];
    const oldConcentration: number = greenHouseGases[index].concentration;
    const newConcentration: number = oldConcentration + oldConcentration * (concentrationChange/100);
    const newGreenHouseGas: GreenHouseGas = GasFactory.createGas(greenHouseGasType, newConcentration);
    newGreenHouseGas.lastChangeRate = concentrationChange;
    setGreenHouseGases((prevGases) => {
      const newGases = [...prevGases];
      newGases[index] = newGreenHouseGas;
      return newGases;
    });
    setGHCR((prevState) => {
      const newGHE = calculateGreenHouseEffect(greenHouseGases);
      return (greenHouseEffect - newGHE) / greenHouseEffect;
    })
  }

  return {greenHouseGases, updateConcentration, greenHouseEffect, greenHouseEffectChangeRate};
}


const defaultPersonActionItems: Item[] = [
  { name: 'Riding public transportation', isActivated: false },
  { name: 'Recycling trash', isActivated: false },
  { name: 'Use of electric vehicles', isActivated: false },
  { name: 'Reduced travel demand', isActivated: false },
  { name: 'Reduce the use of disposable products', isActivated: false },
  { name: 'By foot/bicycle', isActivated: false },
  { name: 'Use items produced at close range', isActivated: false },
  { name: 'Use of low-carbon footprint products', isActivated: false },
  {
    name: 'Refrain from excessive cooling/heating',
    isActivated: false
  },
  { name: 'Saving energy', isActivated: false },
  { name: 'Reduce unnecessary water use', isActivated: false },
  { name: 'Reduce gas use', isActivated: false }
]

const defaultItemState = {
  'person': [1,1,1],
  'enterprise': [1,1,1],
  'country': [1,1,1],
}
export const useActionItems = () => {
  // const [actionItems, setActionItems] = useState([]);
  const [lastSelection, setLastSelection] = useState({} as ItemDataInterface);
  const [currItem, setCurrItem] = useState({} as ItemDataInterface);
  const [select, setSelect] = useState(defaultItemState)
  const {updateConcentration} = useGreenHouseGases();

  useEffect(() => {
    const itemStateRef = ref(database, auth.currentUser?.uid+"/itemState");
    onValue(itemStateRef, (snapshot) => {
      const itemState = snapshot.val();
      if (itemState) {setSelect(JSON.parse(itemState))}
    })
  }, []);

  useEffect(() => {
    set(ref(database, auth.currentUser?.uid+"/itemState"), JSON.stringify(select));
  }, [select])

  useEffect(() => {
    if (Object.keys(lastSelection).length === 0) return;
    updateConcentration(lastSelection.greenGasType, lastSelection.concentration);
  }, [lastSelection]);


  // 가장 최근 사용한(선택)한 아이템
  const getLastSelection = (item: ItemDataInterface) => {setLastSelection(item)}

  // 묶어서 useSelectItem hook을 분리 or useContext or component composition 알아보기
  // const image = useFirebaseImage();

  // 현재까지 선택하여 사용한 아이템 정보를 업데이트한다.
  const getItemSelect = (new_select: ItemSelectInterface) => {setSelect(new_select)}

  // 현재 선택된 아이템
  const getCurrItem = (item:ItemDataInterface) => {setCurrItem(item)}

  return {lastSelection, setLastSelection, select, getItemSelect, currItem, getCurrItem, getLastSelection}
}