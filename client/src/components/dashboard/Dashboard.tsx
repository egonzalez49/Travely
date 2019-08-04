import React from 'react';
import { connect } from 'react-redux';
import { getTopLocations } from '../../actions';
import ImageSlider from './ImageSlider';
import { StoreState } from '../../reducers';
import dashGradient from '../../styles/images/dash-gradient.svg';

interface DashProps {
  getTopLocations: Function;
  locations: any;
}

class Dashboard extends React.Component<DashProps> {
  componentDidMount() {
    this.props.getTopLocations();
  }

  render() {
    if (this.props.locations) {
      return (
        <div className="dash-div">
          <h1>top places</h1>
          <ImageSlider locations={this.props.locations} />
          <img className="dash-gradient1" src={dashGradient} alt="gradient" />
        </div>
      );
    }

    return null;
  }
}

const mapStateToProps = (state: StoreState) => {
  return {
    locations: state.location.topLocations
  };
};

export default connect(
  mapStateToProps,
  { getTopLocations }
)(Dashboard);
