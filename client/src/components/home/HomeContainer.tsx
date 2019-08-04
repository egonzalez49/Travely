import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setSignUp } from '../../actions';
import homeImage from '../../styles/images/home-image.png';
import aboutGradient from '../../styles/images/about-gradient.svg';

import horizontalDots from '../../styles/images/dots-horizontal.svg';
import verticalDots from '../../styles/images/dots-vertical.svg';

interface HomeProps {
  setSignUp: typeof setSignUp;
}

class HomeContainer extends React.Component<HomeProps> {
  render() {
    return (
      <div>
        <div className="home-container">
          <div>
            <h1>
              find your <br />{' '}
              <span style={{ color: '#fff' }}>next paradise</span>
            </h1>
            <p className="sub-text">
              Explore a vast array of tour locations. See what other people have
              rated their trips to locations. Plan your trip to popular
              attractions at each location.
            </p>
            <Link to="/auth">
              <button
                className="button"
                onClick={() => this.props.setSignUp(true)}
              >
                Get Started
              </button>
            </Link>
          </div>
          <img className="home-image" src={homeImage} alt="man on mountain" />
          <img
            className="vertical-dots"
            src={verticalDots}
            alt="vertical design dots"
          />
          <img
            className="horizontal-dots"
            src={horizontalDots}
            alt="horizontal design dots"
          />
        </div>
        <div className="absolute-image">
          <img src={aboutGradient} alt="gradient" />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { setSignUp }
)(HomeContainer);
