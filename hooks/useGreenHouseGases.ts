import {onValue, ref, set} from "firebase/database";
import {auth, database} from "./useFirebase";
import {useEffect, useMemo, useState} from "react";
import {calculateGreenHouseEffect, defaultGreenHouseGases, GasFactory, GreenHouseGas} from "../models/greenhousegas";
import {GreenHouseGasType} from "../models/gamestate.types";

const greenHouseGasNames = ["co2", "n2o", "ch4", "cfcs"];
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
  // const changeRates = useMemo(() => {
  //   const lastChangeRates = greenHouseGases.map(gas => gas.lastChangeRate);
  //   return new Map(greenHouseGasNames.map((name,index )=> [name, lastChangeRates[index]]));
  // }, [greenHouseGases]);

  const greenHouseEffectChangeRate = useMemo(() => {
    const newGHE = calculateGreenHouseEffect(greenHouseGases);
    return (greenHouseEffect - newGHE) / greenHouseEffect;
  }, [greenHouseGases]);

  useEffect(() => {
    onValue(greenHouseGasesRef, (snapshot) => {
      const greenHouseGases = snapshot.val();
      if (greenHouseGases) {
        setGreenHouseGases(GasFactory.deserializeGases(greenHouseGases))
      }
    })
  }, []);

  const updateGreenHouseGasesOnDB = (newGreenHouseGases: GreenHouseGas[]) => {
    set(ref(database, auth.currentUser?.uid + "/greenHouseGases"),
      newGreenHouseGases.map(greenHouseGas => (
        {type: greenHouseGas.name, concentration: greenHouseGas.concentration})));
  }

  const updateConcentration = (greenHouseGasType: GreenHouseGasType, concentrationChange: number) => {
    const index = greenHouseGasIndex[greenHouseGasType];
    const oldConcentration: number = greenHouseGases[index].concentration;
    const newConcentration: number = oldConcentration + oldConcentration * (concentrationChange / 100);
    const newGreenHouseGas: GreenHouseGas = GasFactory.createGas(greenHouseGasType, newConcentration);
    newGreenHouseGas.lastChangeRate = concentrationChange;
    const newGreenHouseGases: GreenHouseGas[] = [...greenHouseGases];
    newGreenHouseGases[index] = newGreenHouseGas;
    updateGreenHouseGasesOnDB(newGreenHouseGases);
  }

  return {greenHouseGases, updateConcentration, greenHouseEffect, greenHouseEffectChangeRate};
}