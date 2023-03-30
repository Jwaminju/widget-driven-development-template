import {Item, ItemState} from "../models/gamestate.types";
import {useEffect, useRef, useState} from "react";
import {ItemDataInterface, ItemSelectInterface} from "../models/items.interface";
import {useGreenHouseGases} from "./useGreenHouseGases";
import {onValue, ref, set, update} from "firebase/database";
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

interface ActivationState {
  [index: string]: boolean;
}

const itemActivationPersonal: ActivationState = {
  'Riding public transportation': false,
  'Recycling trash': false,
  'Use of electric vehicles': false,
  'Reduced travel demand': false,
  'Reduce the use of disposable products': false,
  'By foot/bicycle': false,
  'Use items produced at close range': false,
  'Use of low-carbon footprint products': false,
  'Refrain from excessive cooling/heating': false,
  'Saving energy': false,
  'Reduce unnecessary water use': false,
  'Reduce gas use': false
}

const itemActivationEnterprise: ActivationState = {

}

const itemActivationCountry: ActivationState = {

}

const defaultItemViewState: ItemState = {
  'person': [1, 1, 1],
  'enterprise': [1, 1, 1],
  'country': [1, 1, 1],
}
export const useActionItems = () => {
  const personalActionItems = useRef(itemActivationPersonal);
  // const enterpriseActionItems = useRef(itemActivationEnterprise);
  // const countryActionItems = useRef(itemActivationCountry);
  const [lastSelection, setLastSelection] = useState({} as ItemDataInterface);
  const [currItem, setCurrItem] = useState({} as ItemDataInterface);
  const [select, setSelect] = useState<ItemState>(defaultItemViewState)
  const {updateConcentration} = useGreenHouseGases();

  // 가장 최근 사용한(선택)한 아이템
  const getLastSelection = (item: ItemDataInterface) => {setLastSelection(item)}
  // 현재까지 선택하여 사용한 아이템 정보를 업데이트한다.
  const getItemSelect = (new_select: ItemSelectInterface) => {setSelect(new_select)}
  // 현재 선택된 아이템
  const getCurrItem = (item: ItemDataInterface) => {setCurrItem(item)}

  const updateActivation = (itemName: string, itemType: string) => {
    switch (itemType) {
      case "person":
        personalActionItems.current[itemName] = true;
        return;
      // case "enterprise":
      //   enterpriseActionItems.current[itemName] = true;
      //   return;
      // case "country":
      //   countryActionItems.current[itemName] = true;
      //   return;
    }
  }

  useEffect(() => {
    const itemViewStateRef = ref(database, auth.currentUser?.uid + "/itemViewState");
    const personalItemRef = ref(database, auth.currentUser?.uid + "/items/personal");
    onValue(itemViewStateRef, (snapshot) => {
      const itemViewState = snapshot.val();
      if (itemViewState) {setSelect(JSON.parse(itemViewState))}
    })
    onValue(personalItemRef, (snapshot) => {
      const personalItems = snapshot.val();
      if (personalItems) {personalActionItems.current = personalItems}
    })
  }, []);

  const updatePersonalActivationStateOnDB = (newPersonaActivationState: ActivationState) => {
    update(ref(database, auth.currentUser?.uid + "/items/personal"), {
      ...newPersonaActivationState
    })
  }
  // const updateEnterpriseActivationStateOnDB = (newEnterpriseActivationState: ActivationState) => {
  //   update(ref(database, auth.currentUser?.uid + "/items/enterprise"), {
  //     ...newEnterpriseActivationState
  //   })
  // }
  // const updateCountryActivationStateOnDB = (newCountryActivationState: ActivationState) => {
  //   update(ref(database, auth.currentUser?.uid + "/items/country"), {
  //     ...newCountryActivationState
  //   })
  // }

  useEffect(() => {
    if (Object.keys(lastSelection).length === 0) return;
    updateConcentration(lastSelection.greenGasType, lastSelection.concentration);
    const itemName = lastSelection.name;
    const itemType = lastSelection.type;
    updateActivation(itemName, itemType);
  }, [lastSelection]);

  const updateItemViewStateOnDB = (newItemViewState: ItemState) => {
    set(ref(database, auth.currentUser?.uid + "/itemState"), JSON.stringify(newItemViewState));
  }

  return {lastSelection, setLastSelection, select, getItemSelect, currItem, getCurrItem, getLastSelection}
}