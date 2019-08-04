import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../reducers';
import { Location } from '../dashboard/ImageSlider';
import Rating from 'react-rating';
import fullStar from '../../styles/images/full-star.svg';
import emptyStar from '../../styles/images/empty-star.svg';

interface LocationHeaderProps {
  current: Location;
}

class LocationHeader extends React.Component<LocationHeaderProps> {
  render() {
    const { current } = this.props;

    if (current) {
      return (
        <div className="location-header">
          <div className="location-header-image">
            <img src={current.imageUrl} alt="city" />
          </div>
          <div>
            <div className="location-header-div">
              <h2 className="location-header-name">
                {current.city}, {current.country}
              </h2>
              <Rating
                emptySymbol={<img src={emptyStar} alt="star" />}
                fullSymbol={<img src={fullStar} alt="star" />}
                initialRating={
                  Math.round(Number(this.props.current.rating) * 2) / 2
                }
                fractions={2}
                readonly
              />
            </div>
            <p>{current.description}</p>
            <button className="button">Visit</button>
          </div>
        </div>
      );
    }

    return null;
  }
}

const mapStateToProps = (state: StoreState) => {
  return {
    current: state.location.currentLocation
  };
};

export default connect(mapStateToProps)(LocationHeader);
