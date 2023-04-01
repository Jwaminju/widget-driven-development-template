import {onValue, ref, set} from "firebase/database";
import {auth, database} from "./useFirebase";
import {useEffect, useMemo, useState} from "react";
import {calculateGreenHouseEffect, defaultGreenHouseGases, GasFactory, GreenHouseGas} from "../models/greenhousegas";
import {GreenHouseGasType} from "../models/gamestate.types";
import {greenHouseGasesRef, playtimeRef} from "./utils/dbRefs";

const greenHouseGasNames = ["co2", "n2o", "ch4", "cfcs"];
export const greenHouseGasIndex:{[index: string]: number} = {
  "co2": 0,
  "n2o": 1,
  "ch4": 2,
  "cfcs": 3
}
export const useGreenHouseGases = () => {
  const [greenHouseGases, setGreenHouseGases] = useState(defaultGreenHouseGases);
  const greenHouseEffect = useMemo(() => calculateGreenHouseEffect(greenHouseGases), [greenHouseGases]);
  const greenHouseEffectChangeRate = useMemo(() => {
    const newGHE = calculateGreenHouseEffect(greenHouseGases);
    const defaultGHE = calculateGreenHouseEffect(defaultGreenHouseGases);
    return (defaultGHE - newGHE) / defaultGHE;
  }, [greenHouseGases]);

  useEffect(() => {
    onValue(greenHouseGasesRef, (snapshot) => {
      const greenHouseGases = snapshot.val();
      if (greenHouseGases) {
        setGreenHouseGases(GasFactory.deserializeGases(greenHouseGases))
      }
    })
    onValue(playtimeRef, (snapshot) => {
      setGreenHouseGases((greenHouseGases) => {
        return greenHouseGasNames.map(gasName => {
          return GasFactory.createGas(
            gasName,
            1.005 * greenHouseGases[greenHouseGasIndex[gasName]].concentration,
            greenHouseGases[greenHouseGasIndex[gasName]].lastChangeRate
          );
        })
      })
    })
  }, []);


  return {greenHouseGases, greenHouseEffect, greenHouseEffectChangeRate};
}

export const updateGreenHouseGasesOnDB = (newGreenHouseGases: GreenHouseGas[]) => {
  set(greenHouseGasesRef,
    newGreenHouseGases.map(greenHouseGas => (
        {
          type: greenHouseGas.name,
          concentration: greenHouseGas.concentration,
          lastChangeRate: greenHouseGas.lastChangeRate
        }
      )
    ));
}

export const updateConcentration = (greenHouseGasType: GreenHouseGasType, concentrationChange: number, greenHouseGases: GreenHouseGas[]) => {
  const index = greenHouseGasIndex[greenHouseGasType];
  const oldConcentration: number = greenHouseGases[index].concentration;
  const newConcentration: number = oldConcentration + oldConcentration * (concentrationChange / 100);
  const newGreenHouseGas: GreenHouseGas = GasFactory.createGas(greenHouseGasType, newConcentration, concentrationChange);
  const newGreenHouseGases: GreenHouseGas[] = [...greenHouseGases];
  newGreenHouseGases[index] = newGreenHouseGas;
  updateGreenHouseGasesOnDB(newGreenHouseGases);
}