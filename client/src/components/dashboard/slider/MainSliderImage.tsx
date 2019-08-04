import React from 'react';
import { Location } from '../ImageSlider';
import { Link } from 'react-router-dom';

interface MainSliderProps {
  location: Location;
}

class MainSliderImage extends React.Component<MainSliderProps> {
  render() {
    const { location } = this.props;

    return (
      <div className="slider-div">
        <div className="slider-center">
          <Link to={`/location/${location._id}`}>
            <img src={location.imageUrl} alt={location.city} />
            <div className="slider-text">
              <h2>{location.city},</h2>
              <h2>{location.country}</h2>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default MainSliderImage;
