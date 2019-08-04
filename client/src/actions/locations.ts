import axios from 'axios';
import { LocationActionTypes } from './types';
import { Dispatch } from 'redux';

export const getTopLocations = () => async (dispatch: Dispatch) => {
  console.log('ran');
  axios.get('/rest/location').then(res => {
    dispatch({
      type: LocationActionTypes.setTopLocations,
      payload: res.data
    });
  });
};

export const fetchLocation = (id: string): any => async (
  dispatch: Dispatch
) => {
  axios.get(`/rest/location/${id}`).then(res => {
    dispatch({
      type: LocationActionTypes.getLocation,
      payload: res.data
    });
  });
};

export const clearLocation = () => {
  return {
    type: LocationActionTypes.getLocation,
    payload: null
  };
};

export const fetchReviews = (id: string, page: number) => async (
  dispatch: Dispatch
) => {
  axios.get(`/rest/review/location/${id}/${page}`).then(res => {
    dispatch({
      type: LocationActionTypes.getReview,
      payload: res.data
    });
  });
};

export const addReview = review => async (dispatch: Dispatch) => {
  axios.post(`/rest/review/`, review).then(res => {
    dispatch(fetchLocation(review.location));
  });
};
