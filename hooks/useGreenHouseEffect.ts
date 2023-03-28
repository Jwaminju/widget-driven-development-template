import {calculateGreenHouseEffect, Cfcs, Ch4, Co2, concentrations, GreenHouseGas, N2o} from "../models/greenhousegas";
import {useMemo, useState} from "react";


// export const currentGreenHouseGases = atom({
//   key: "currentGreenHouseGases",
//   default: [
//     new Co2(concentrations["co2"]),
//     new N2o(concentrations["n2o"]),
//     new Ch4(concentrations["ch4"]),
//     new Cfcs(concentrations["cfcs"])
//   ]
// })

const defaultGasState = [
  new Co2(concentrations["co2"]),
  new N2o(concentrations["n2o"]),
  new Ch4(concentrations["ch4"]),
  new Cfcs(concentrations["cfcs"])
];
export const useGreenHouseEffect = (greenHouseGases?: GreenHouseGas[]) => {
  const [currentGreenHouseGases, setGHG] = useState<GreenHouseGas[]>(greenHouseGases || defaultGasState);
  const greenHouseEffect = useMemo(() => calculateGreenHouseEffect(currentGreenHouseGases), currentGreenHouseGases);
  return {
    currentGreenHouseGases,
    greenHouseEffect,
  }
}