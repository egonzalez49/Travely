import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../reducers';
import authGradient from '../../styles/images/auth-gradient.svg';
import contactImage from '../../styles/images/contact-image.png';
import ContactForm from './ContactForm';

interface AuthProps {
  renderSignUp: boolean;
}

class ContactContainer extends React.Component<AuthProps> {
  render() {
    return (
      <div>
        <div className="auth-field">
          <ContactForm />
        </div>
        <img
          className="auth-gradient"
          src={authGradient}
          alt="background gradient"
        />
        <img className="auth-image" src={contactImage} alt="woman on beach" />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => {
  return {
    renderSignUp: state.auth.renderSignUp
  };
};

export default connect(null)(ContactContainer);
