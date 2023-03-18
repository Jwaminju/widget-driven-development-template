export interface Action {
  name: string;
  isDone: boolean;
//   온실가스에 미치는 영향
}

// export interface PersonalAction extends Action {
//
// }
//
// export interface EnterpriseAction extends Action {
// }
//
// export interface NationalAction extends Action {
// }

export interface UserActions {
  personalActions: Action[];
  enterpriseActions: Action[];
  nationalActions: Action[];
}

export const setAction = (name: string, isDone: boolean): Action => ({ name, isDone });
export const setUserActions = ({ personalActions = [], enterpriseActions = [], nationalActions = [] }: UserActions): UserActions => (
  {
    personalActions: personalActions,
    enterpriseActions: enterpriseActions,
    nationalActions: nationalActions
  }
);