import axios from 'axios';
import { AuthActionTypes } from './types';
import { Dispatch } from 'redux';

export const setSignUp = (value: boolean) => {
  return {
    type: AuthActionTypes.setSignup,
    payload: value
  };
};

export const userLogin = userInfo => (dispatch: Dispatch) => {
  console.log(userInfo);
  axios
    .post('/rest/auth/login', userInfo)
    .then(res => {
      dispatch({
        type: AuthActionTypes.userUpdate,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: AuthActionTypes.error,
        payload: err.response.data
      });
    });
};

export const clearError = () => {
  return {
    type: AuthActionTypes.error,
    payload: null
  };
};

export const userRegister = userInfo => (dispatch: Dispatch) => {
  console.log(userInfo);
  axios
    .post('/rest/auth/signup', userInfo)
    .then(res => {
      dispatch({
        type: AuthActionTypes.userUpdate,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: AuthActionTypes.error,
        payload: err.response.data
      });
    });
};
