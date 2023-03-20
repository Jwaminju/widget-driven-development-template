export interface IClimateAction {
  name: string;
  isDone: boolean;
  affectedGreenHouseGas: string;
  affectionOnGreenHouseGas: () => number;
}

export interface IClimateActions {
  personalActions: IClimateAction[];
  enterpriseActions: IClimateAction[];
  nationalActions: IClimateAction[];
}

export const ClimateAction = (name: string, isDone: boolean, affectedGreenHouseGas: string, affectionOnGreenHouseGas: () => number): IClimateAction => (
  { name, isDone, affectedGreenHouseGas, affectionOnGreenHouseGas }
);
export const ClimateActions = ({ personalActions = [], enterpriseActions = [], nationalActions = [] }: IClimateActions): IClimateActions => (
  {
    personalActions: personalActions,
    enterpriseActions: enterpriseActions,
    nationalActions: nationalActions
  }
);