import React from 'react';
import FormCreator from '../form/FormCreator';
import { registerFields } from '../form/formFields';
import { connect } from 'react-redux';
import { setSignUp, userRegister, clearError } from '../../actions';
import { StoreState } from '../../reducers';

interface AuthFormProps {
  setSignUp: typeof setSignUp;
  userRegister: Function;
  clearError: typeof clearError;
  error: string | null;
}

class RegisterForm extends React.Component<AuthFormProps> {
  onClick = values => {
    this.props.userRegister(values);
  };

  componentDidMount() {
    this.props.clearError();
  }

  render() {
    return (
      <div className="auth-form">
        <FormCreator
          fields={registerFields}
          buttonText="Sign Up"
          title="welcome!"
          formError={this.props.error}
          onClick={this.onClick}
        />
        <p className="form-sub-text">
          Already have an account?{' '}
          <span
            onClick={() => this.props.setSignUp(false)}
            style={{ cursor: 'pointer', color: '#FFF' }}
          >
            Login!
          </span>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => {
  return {
    error: state.auth.error
  };
};

export default connect(
  mapStateToProps,
  { setSignUp, userRegister, clearError }
)(RegisterForm);
