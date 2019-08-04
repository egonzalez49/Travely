import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setSignUp } from '../../actions';
import logo from '../../styles/images/logo.svg';

interface NavLink {
  name: string;
  to: string;
}

const LINKS: NavLink[] = [
  {
    name: 'home',
    to: '/'
  },
  {
    name: 'about',
    to: '/about'
  },
  {
    name: 'contact',
    to: '/contact'
  },
  {
    name: 'login',
    to: '/auth'
  }
];

interface NavProps {
  match: any;
  setSignUp: typeof setSignUp;
}

class HomeNav extends React.Component<NavProps> {
  renderNavLinks = (): JSX.Element[] => {
    return LINKS.map((link: NavLink) => {
      //make cleaner code here
      if (link.name === 'login') {
        return (
          <li
            className={link.to === this.props.match.path ? 'active-link' : ''}
            key={link.name}
            onClick={() => this.props.setSignUp(false)}
          >
            <Link to={link.to}>{link.name}</Link>
          </li>
        );
      }

      return (
        <li
          className={link.to === this.props.match.path ? 'active-link' : ''}
          key={link.name}
        >
          <Link to={link.to}>{link.name}</Link>
        </li>
      );
    });
  };

  render() {
    return (
      <div className="navbar">
        <div>
          {/* <img className="logo-image" src={logo} alt="website logo" /> */}
          <img className="logo-image" src={logo} alt="logo of website" />
          <h3 className="logo">
            <Link to="/">travely</Link>
          </h3>
        </div>
        <nav>
          <ul>{this.renderNavLinks()}</ul>
        </nav>
      </div>
    );
  }
}

export default connect(
  null,
  { setSignUp }
)(HomeNav);
