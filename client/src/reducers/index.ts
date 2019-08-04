import { combineReducers } from 'redux';
import { authReducer, AuthState } from './authReducer';
import { locationReducer, LocationState } from './locationReducer';

export interface StoreState {
  auth: AuthState;
  location: LocationState;
}

export const reducers = combineReducers<StoreState>({
  auth: authReducer,
  location: locationReducer
});
