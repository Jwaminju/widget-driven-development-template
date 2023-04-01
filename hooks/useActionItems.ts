import {Item, ItemState} from "../models/gamestate.types";
import {useEffect, useRef, useState} from "react";
import {ItemDataInterface, ItemSelectInterface} from "../models/items.interface";
import {updateConcentration} from "./useGreenHouseGases";
import {get, onValue, set, update} from "firebase/database";
import {changePlayTime} from "./usePlayTime";
import PERSON_ITEMS from "../data/items/personal_item";
import COUNTRY_ITEMS from "../data/items/country_items";
import ENTERPRISE_ITEMS from "../data/items/enterprise_items";
import {defaultGreenHouseGases, GasFactory} from "../models/greenhousegas";
import {
  countryActivationRef,
  enterpriseActivationRef,
  greenHouseGasesRef,
  itemViewStateRef,
  personalActivationRef,
  phaseRef
} from "./utils/dbRefs";

const defaultPersonActionItems: Item[] = [
  {name: 'Riding public transportation', isActivated: false},
  {name: 'Recycling trash', isActivated: false},
  {name: 'Use of electric vehicles', isActivated: false},
  {name: 'Reduced travel demand', isActivated: false},
  {name: 'Reduce the use of disposable products', isActivated: false},
  {name: 'By foot or bicycle', isActivated: false},
  {name: 'Use items produced at close range', isActivated: false},
  {name: 'Use of low-carbon footprint products', isActivated: false},
  {
    name: 'Refrain from excessive cooling or heating',
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
  'By foot or bicycle': false,
  'Use items produced at close range': false,
  'Use of low-carbon footprint products': false,
  'Refrain from excessive cooling or heating': false,
  'Saving energy': false,
  'Reduce unnecessary water use': false,
  'Reduce gas use': false
}

const itemActivationEnterprise: ActivationState = {
  'Education and Awareness': false,
  'Waste Management': false,
  'New product development': false,
  'Use of recycled materials': false,
  'Increase the use of renewable energy': false,
  'Improved fuel efficiency with advanced design, materials, and technology': false,
  'Streamlining the distribution process': false,
  'Reduced use of fossil fuels': false,
  'Fuel conversion': false,
  'Use of methane gas reducer': false,
  'Reuse of greenhouse gas': false,
  'Biogas production': false
}

const itemActivationCountry: ActivationState = {
  'International Methane Gas Reduction Program under the United Nations': false,
  'Carbon emission rights system': false,
  'Sustainable Development Goals': false,
  'UN Environment Program': false,
  'Land and crop management': false,
  'International Resource Panel': false,
  'United Nations Framework Convention on Climate Change': false,
  'Livestock or manure management': false,
  'Sustainable Consumption and Production': false,
  'Environmental Justice': false,
  'Change of land use': false,
  'Marine Waste Management': false
}

const defaultItemViewState: ItemState = {
  'person': [1, 1, 1],
  'enterprise': [1, 1, 1],
  'country': [1, 1, 1],
}
export const useActionItems = () => {
  const data = [...PERSON_ITEMS, ...COUNTRY_ITEMS, ...ENTERPRISE_ITEMS];
  const personalActionItems = useRef(itemActivationPersonal);
  const enterpriseActionItems = useRef(itemActivationEnterprise);
  const countryActionItems = useRef(itemActivationCountry);
  const [lastSelection, setLastSelection] = useState({} as ItemDataInterface);
  const [currItem, setCurrItem] = useState({} as ItemDataInterface);
  const [select, setSelect] = useState<ItemState>(defaultItemViewState)
  const [phase, setPhase] = useState(0);

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
        updatePersonalActivationStateOnDB(personalActionItems.current);
        return;
      case "enterprise":
        enterpriseActionItems.current[itemName] = true;
        updateEnterpriseActivationStateOnDB(enterpriseActionItems.current);
        return;
      case "country":
        countryActionItems.current[itemName] = true;
        updateCountryActivationStateOnDB(countryActionItems.current);
        return;
    }
  }

  useEffect(() => {
    onValue(itemViewStateRef, (snapshot) => {
      const itemViewState = snapshot.val();
      if (itemViewState) {setSelect(JSON.parse(itemViewState))}
    })
    onValue(personalActivationRef, (snapshot) => {
      const personalItemActivation = snapshot.val();
      if (personalItemActivation) {personalActionItems.current = personalItemActivation}
    })
    onValue(enterpriseActivationRef, (snapshot) => {
      const enterpriseItemActivation = snapshot.val();
      if (enterpriseItemActivation) {personalActionItems.current = enterpriseItemActivation}
    })
    onValue(countryActivationRef, (snapshot) => {
      const countryItemActivation = snapshot.val();
      if (countryItemActivation) {personalActionItems.current = countryItemActivation}
    })
    onValue(phaseRef, (snapshot) => {
      const savedPhase = snapshot.val();
      if (savedPhase) {setPhase(savedPhase)};
    })
  }, []);

  const updatePersonalActivationStateOnDB = (newPersonaActivationState: ActivationState) => {
    update(personalActivationRef, {
      ...newPersonaActivationState
    })
  }
  const updateEnterpriseActivationStateOnDB = (newEnterpriseActivationState: ActivationState) => {
    update(enterpriseActivationRef, {
      ...newEnterpriseActivationState
    })
  }
  const updateCountryActivationStateOnDB = (newCountryActivationState: ActivationState) => {
    update(countryActivationRef, {
      ...newCountryActivationState
    })
  }
  const updateItemViewStateOnDB = (newItemViewState: ItemState) => {
    set(itemViewStateRef, JSON.stringify(newItemViewState));
  }

  const updatePhaseOnDB = (newPhase: number) => {
    set(phaseRef, newPhase);
  }

  useEffect(() => {
    if (Object.keys(lastSelection).length === 0) return;
    get(greenHouseGasesRef)
      .then((snapshot) => {
        if (snapshot) {
          const greenHouseGases = snapshot.val();
          updateConcentration(lastSelection.greenGasType, lastSelection.concentration, GasFactory.deserializeGases(greenHouseGases));
        }
        else {
          updateConcentration(lastSelection.greenGasType, lastSelection.concentration, defaultGreenHouseGases);
        }
        const itemName = lastSelection.name;
        const itemType = lastSelection.type;
        updateActivation(itemName, itemType);
        changePlayTime(lastSelection);
        updateItemViewStateOnDB(select);
        const newPhase = phase == 2 ? 0 : phase+1;
        updatePhaseOnDB(newPhase);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [lastSelection]);


  return {lastSelection, setLastSelection, select, getItemSelect, currItem, getCurrItem, getLastSelection, data, phase}
}