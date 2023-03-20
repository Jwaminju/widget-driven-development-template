import {atom, selector} from "recoil";
import {Atmosphere} from "../models/atmosphere";
import {Co2, GreenHouseGas, No2} from "../models/greenhousegas";

export const greenHouseGases: GreenHouseGas[] = [new Co2(0.0), new No2(0.0)];
export const atmosphereState = atom({
  key: "atmosphere",
  default: new Atmosphere(greenHouseGases)
})

export const currentGreenHouseGases = selector({
  key: "currentGreenHouseGases",
  get: ({get}) => {
    return get(atmosphereState).greenHouseGases;
  }
})

export const useAtmosphere = () => {
  return {
    atmosphereState,
    currentGreenHouseGases
  }
}