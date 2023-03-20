export interface GreenHouseGas {
  get name(): string;
  get measurement(): number;
  set measurement(measurement: number);
}

export class Co2 implements GreenHouseGas {
  measurement: number = 0.0;
  name: string = "Co2";
  constructor(measurement: number) {
    this.measurement = measurement;
  }
}

export class No2 implements GreenHouseGas {
  measurement: number = 0.0;
  name: string = "No2";
  constructor(measurement: number) {
    this.measurement = measurement;
  }
}

export class Ch4 implements GreenHouseGas {
  measurement: number = 0.0;
  name: string = "Ch4";
  constructor(measurement: number) {
    this.measurement = measurement;
  }
}

export class H2o implements GreenHouseGas {
  measurement: number = 0.0;
  name: string = "H2o";
  constructor(measurement: number) {
    this.measurement = measurement;
  }
}
export class GasFactory {
  public createGas(type: string, measurement: number): GreenHouseGas {
    switch (type) {
      case "co2":
        return new Co2(measurement);
      case "no2":
        return new No2(measurement);
      case "ch4":
        return new Ch4(measurement);
      default:
        return new H2o(measurement);
    }
  }
}