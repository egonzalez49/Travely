export enum AuthActionTypes {
  setSignup,
  userUpdate,
  error
}

export enum LocationActionTypes {
  setTopLocations,
  getLocation,
  getReview
}

interface SetTopAction {
  type: LocationActionTypes.setTopLocations;
  payload: any;
}

interface GetLocationAction {
  type: LocationActionTypes.getLocation;
  payload: any;
}

interface GetReviewAction {
  type: LocationActionTypes.getReview;
  payload: any;
}

interface SetSignUpAction {
  type: AuthActionTypes.setSignup;
  payload: boolean;
}

interface UpdateUserAction {
  type: AuthActionTypes.userUpdate;
  payload: any;
}

interface AuthErrorAction {
  type: AuthActionTypes.error;
  payload: any;
}

export type AuthAction = SetSignUpAction | UpdateUserAction | AuthErrorAction;
export type LocationAction = SetTopAction | GetLocationAction | GetReviewAction;
