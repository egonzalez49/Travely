import { combineReducers } from 'redux';
import { authReducer, AuthState } from './authReducer';

export interface StoreState {
  auth: AuthState;
}

export const reducers = combineReducers<StoreState>({
  auth: authReducer
});
