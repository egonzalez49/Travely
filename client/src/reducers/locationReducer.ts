import { LocationAction, LocationActionTypes } from '../actions/types';
import { Location } from '../components/dashboard/ImageSlider';
import { Attraction } from '../components/locations/LocationAttractions';

export interface LocationState {
  topLocations: any;
  error: any;
  currentLocation: Location;
  reviews: any;
  page: number;
}

const intializedState = {
  topLocations: null,
  currentLocation: null,
  error: null,
  reviews: null,
  page: 0
};

export const locationReducer = (
  state: LocationState = intializedState,
  action: LocationAction
) => {
  switch (action.type) {
    case LocationActionTypes.getReview:
      return {
        ...state,
        reviews: action.payload
      };
    case LocationActionTypes.getLocation:
      return { ...state, currentLocation: action.payload };
    case LocationActionTypes.setTopLocations:
      return { ...state, topLocations: action.payload };
    default:
      return state;
  }
};
