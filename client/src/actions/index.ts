import axios from 'axios';
import { AuthActionTypes } from './types';
import { Dispatch } from 'redux';
export * from './locations';

export const setSignUp = (value: boolean) => {
  return {
    type: AuthActionTypes.setSignup,
    payload: value
  };
};

export const userLogin = (userInfo, history) => (dispatch: Dispatch) => {
  axios
    .post('/rest/auth/login', userInfo)
    .then(res => {
      history.push('/dashboard');
      dispatch({
        type: AuthActionTypes.userUpdate,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
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

export const userRegister = (userInfo, history) => (dispatch: Dispatch) => {
  axios
    .post('/rest/auth/signup', userInfo)
    .then(res => {
      history.push('/dashboard');
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

export const logout = history => (dispatch: Dispatch) => {
  axios.get('/rest/auth/logout').then(() => {
    history.push('/');
    dispatch({
      type: AuthActionTypes.userUpdate,
      payload: null
    });
  });
};
