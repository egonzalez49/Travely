import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { logout } from '../../actions';
import logo from '../../styles/images/logo.svg';
import search from '../../styles/images/search.svg';
import profile from '../../styles/images/profile.svg';

interface NavProps extends RouteComponentProps<any> {
  match: any;
  logout: Function;
  history: any;
}

class HomeNav extends React.Component<NavProps> {
  render() {
    return (
      <div className="navbar dashnav">
        <div>
          {/* <img className="logo-image" src={logo} alt="website logo" /> */}
          <img className="logo-image" src={logo} alt="logo of website" />
          <h3 className="logo">
            <Link to="/dashboard">travely</Link>
          </h3>
        </div>
        <div>
          <img className="search-image" src={search} alt="search icon" />
          <input type="text" className="search-bar" />
        </div>
        <div>
          <Link
            to="#"
            onClick={() => this.props.logout(this.props.history)}
            style={{ float: 'left' }}
          >
            Logout
          </Link>
          <Link
            style={{ marginLeft: '1em', float: 'right', display: 'inline' }}
            to="/account"
          >
            <img
              style={{ display: 'inline' }}
              className="profile-icon"
              src={profile}
              alt="profile icon"
            />
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { logout }
)(withRouter(HomeNav));
