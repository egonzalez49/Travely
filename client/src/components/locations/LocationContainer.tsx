import React from 'react';
import { connect } from 'react-redux';
import { fetchLocation, clearLocation, fetchReviews } from '../../actions';
import LocationHeader from './LocationHeader';
import headerGradient from '../../styles/images/header-gradient.svg';
import LocationAttractions from './LocationAttractions';
import ReviewContainer from '../reviews/ReviewContainer';
import { StoreState } from '../../reducers';

interface LocationProps {
  match: any;
  fetchLocation: Function;
  fetchReviews: Function;
  clearLocation: typeof clearLocation;
  page: number;
}

class LocationContainer extends React.Component<LocationProps> {
  componentDidMount() {
    this.props.fetchLocation(this.props.match.params.id);
    this.props.fetchReviews(this.props.match.params.id, this.props.page);
  }

  componentWillUnmount() {
    this.props.clearLocation();
  }

  render() {
    return (
      <div className="dash-div hide-y">
        <LocationHeader />
        <LocationAttractions />
        <ReviewContainer />
        <img className="header-gradient" src={headerGradient} alt="gradient" />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => {
  return {
    page: state.location.page
  };
};

export default connect(
  mapStateToProps,
  { fetchLocation, clearLocation, fetchReviews }
)(LocationContainer);
