import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setSignUp } from '../../actions';
import homeImage from '../../styles/images/home-image.png';
import homeGradient from '../../styles/images/home-gradient.svg';
import facebook from '../../styles/images/facebook.svg';
import twitter from '../../styles/images/twitter.svg';
import instagram from '../../styles/images/instagram.svg';
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
              <button onClick={() => this.props.setSignUp(true)}>
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
          <img src={homeGradient} alt="gradient" />
        </div>
        <div className="absolute-social">
          <ul>
            <li>
              <img src={facebook} alt="facebook icon" />
            </li>
            <li>
              <img src={instagram} alt="instagram icon" />
            </li>
            <li>
              <img src={twitter} alt="twitter icon" />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { setSignUp }
)(HomeContainer);
