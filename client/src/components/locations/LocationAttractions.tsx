import React from 'react';
import { connect } from 'react-redux';
import { Location } from '../dashboard/ImageSlider';
import { StoreState } from '../../reducers';

export interface Attraction {
  name: string;
  _id: string;
  location: string;
  description: string;
  imageUrl: string;
}

interface LocationAttractionsProps {
  current: Location;
}

class LocationAttractions extends React.Component<LocationAttractionsProps> {
  state = {
    number: 0
  };

  renderAttractions = () => {
    return this.props.current.attractions.map(
      (attraction: Attraction, index: number) => {
        return (
          <div
            className="attraction"
            key={attraction._id}
            onClick={() =>
              this.setState({
                number: index
              })
            }
          >
            <img
              className={`${this.state.number === index ? 'selected' : ''}`}
              src={attraction.imageUrl}
              alt="attraction"
            />
            {/* <h3>{attraction.name}</h3>
          <p>{attraction.description}</p> */}
          </div>
        );
      }
    );
  };

  renderDetail = () => {
    return (
      <div>
        <h3>{this.props.current.attractions[this.state.number].name}</h3>
        <p style={{ fontSize: '0.8em' }}>
          {this.props.current.attractions[this.state.number].description}
        </p>
      </div>
    );
  };

  render() {
    if (this.props.current && this.props.current.attractions) {
      return (
        <div className="location-attractions-container">
          <h2 className="h2-big-w">Places to Visit</h2>
          <div className="location-attractions">{this.renderAttractions()}</div>
          <div className="attraction-detail">{this.renderDetail()}</div>
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

export default connect(mapStateToProps)(LocationAttractions);
