import {Item, ItemState} from "../models/gamestate.types";
import {useEffect, useState} from "react";
import {ItemDataInterface, ItemSelectInterface} from "../data/items.interface";
import {useGreenHouseGases} from "./useGreenHouseGases";
import {onValue, ref, set} from "firebase/database";
import {auth, database} from "./useFirebase";

const defaultPersonActionItems: Item[] = [
  {name: 'Riding public transportation', isActivated: false},
  {name: 'Recycling trash', isActivated: false},
  {name: 'Use of electric vehicles', isActivated: false},
  {name: 'Reduced travel demand', isActivated: false},
  {name: 'Reduce the use of disposable products', isActivated: false},
  {name: 'By foot/bicycle', isActivated: false},
  {name: 'Use items produced at close range', isActivated: false},
  {name: 'Use of low-carbon footprint products', isActivated: false},
  {
    name: 'Refrain from excessive cooling/heating',
    isActivated: false
  },
  {name: 'Saving energy', isActivated: false},
  {name: 'Reduce unnecessary water use', isActivated: false},
  {name: 'Reduce gas use', isActivated: false}
]
const defaultItemState: ItemState = {
  'person': [1, 1, 1],
  'enterprise': [1, 1, 1],
  'country': [1, 1, 1],
}
export const useActionItems = () => {
  // const [actionItems, setActionItems] = useState([]);
  const [lastSelection, setLastSelection] = useState({} as ItemDataInterface);
  const [currItem, setCurrItem] = useState({} as ItemDataInterface);
  const [select, setSelect] = useState<ItemState>(defaultItemState)
  const {updateConcentration} = useGreenHouseGases();

  useEffect(() => {
    const itemStateRef = ref(database, auth.currentUser?.uid + "/itemState");
    onValue(itemStateRef, (snapshot) => {
      const itemState = snapshot.val();
      if (itemState) {
        setSelect(JSON.parse(itemState))
      }
    })
  }, []);

  useEffect(() => {
    if (Object.keys(lastSelection).length === 0) return;
    updateConcentration(lastSelection.greenGasType, lastSelection.concentration);
  }, [lastSelection]);

  const updateItemStateOnDB = (newItemState: ItemState) => {
    set(ref(database, auth.currentUser?.uid + "/itemState"), JSON.stringify(newItemState));
  }
  // 가장 최근 사용한(선택)한 아이템
  const getLastSelection = (item: ItemDataInterface) => {
    setLastSelection(item)
  }

  // 묶어서 useSelectItem hook을 분리 or useContext or component composition 알아보기
  // const image = useFirebaseImage();

  // 현재까지 선택하여 사용한 아이템 정보를 업데이트한다.
  const getItemSelect = (new_select: ItemSelectInterface) => {
    setSelect(new_select)
  }

  // 현재 선택된 아이템
  const getCurrItem = (item: ItemDataInterface) => {
    setCurrItem(item)
  }

  return {lastSelection, setLastSelection, select, getItemSelect, currItem, getCurrItem, getLastSelection}
}