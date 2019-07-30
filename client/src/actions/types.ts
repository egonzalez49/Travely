export enum AuthActionTypes {
  setSignup,
  userUpdate,
  error
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
