import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import FormCreator from '../form/FormCreator';
import { loginFields } from '../form/formFields';
import { connect } from 'react-redux';
import { setSignUp, userLogin, clearError } from '../../actions';
import { StoreState } from '../../reducers';

interface AuthFormProps extends RouteComponentProps<any> {
  setSignUp: typeof setSignUp;
  userLogin: Function;
  clearError: typeof clearError;
  error: string | null;
  history: any;
}

class LoginForm extends React.Component<AuthFormProps> {
  onClick = values => {
    this.props.userLogin(values, this.props.history);
  };

  componentDidMount() {
    this.props.clearError();
  }

  render() {
    return (
      <div className="auth-form">
        <FormCreator
          fields={loginFields}
          buttonText="Login"
          login
          formError={this.props.error}
          onClick={this.onClick}
          title="hey again!"
        />
        <p className="form-sub-text">
          Don't have an account?{' '}
          <span
            onClick={() => this.props.setSignUp(true)}
            style={{ cursor: 'pointer', color: '#FFF' }}
          >
            Sign up!
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
  { setSignUp, userLogin, clearError }
)(withRouter(LoginForm));
