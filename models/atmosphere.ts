import {GreenHouseGas} from "./greenhousegas";

export interface IAtmosphere {
  greenHouseGases: GreenHouseGas[];
  getGreenHouseMeasurement: () => number;
}


export class Atmosphere implements IAtmosphere {
  greenHouseGases: GreenHouseGas[] = [];

  constructor(greenHouseGases: GreenHouseGas[]) {
    this.greenHouseGases = greenHouseGases;
  }

  public getGreenHouseMeasurement(): number {
    return this.greenHouseGases
      .map((greenHouseGas) => greenHouseGas.concentration)
      .reduce((totalMeasurement, measurement) => (totalMeasurement + measurement));
  }
}