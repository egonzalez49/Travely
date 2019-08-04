import React from 'react';
import aboutImage from '../../styles/images/about-image.png';
import aboutGradient from '../../styles/images/about-gradient.svg';
import horizontalDots from '../../styles/images/dots-horizontal.svg';
import verticalDots from '../../styles/images/dots-vertical.svg';

class AboutContainer extends React.Component {
  render() {
    return (
      <div>
        <div className="home-container">
          <div>
            <h1>
              we're here <br /> <span style={{ color: '#fff' }}>for you</span>
            </h1>
            <p className="sub-text">
              We strive to make your next adventure a fabulous one by connecting
              you to our system of tour locations. This allows you to make your
              best decision on where you should vacation next!
            </p>
            <p className="sub-text">
              Blah blah blah... does anyone actually read this section?
            </p>
          </div>
          <img className="home-image" src={aboutImage} alt="man on mountain" />
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

export default AboutContainer;
