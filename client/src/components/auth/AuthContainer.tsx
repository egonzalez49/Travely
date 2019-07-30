import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../reducers';
import LoginForm from './LoginForm';
import authGradient from '../../styles/images/auth-gradient.svg';
import authImage from '../../styles/images/auth-image.png';
import RegisterForm from './RegisterForm';

interface AuthProps {
  renderSignUp: boolean;
}

class AuthContainer extends React.Component<AuthProps> {
  render() {
    return (
      <div>
        <div className="auth-field">
          {this.props.renderSignUp ? <RegisterForm /> : <LoginForm />}
        </div>
        <img
          className="auth-gradient"
          src={authGradient}
          alt="background gradient"
        />
        <img
          className="auth-image"
          src={authImage}
          alt="man diving into ocean"
        />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => {
  return {
    renderSignUp: state.auth.renderSignUp
  };
};

export default connect(mapStateToProps)(AuthContainer);
