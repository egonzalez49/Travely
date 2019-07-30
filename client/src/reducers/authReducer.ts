import { AuthActionTypes, AuthAction } from '../actions/types';

export interface AuthState {
  renderSignUp: boolean;
  user: any;
  error: any;
}

const intializedState = {
  renderSignUp: false,
  user: null,
  error: null
};

export const authReducer = (
  state: AuthState = intializedState,
  action: AuthAction
) => {
  switch (action.type) {
    case AuthActionTypes.error:
      return { ...state, error: action.payload };
    case AuthActionTypes.userUpdate:
      return { ...state, user: action.payload };
    case AuthActionTypes.setSignup:
      return { ...state, renderSignUp: action.payload };
    default:
      return state;
  }
};
