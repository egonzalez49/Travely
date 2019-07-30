import React from 'react';
import FormField from './FormField';

export interface FormItem {
  label: string;
  placeholder?: string;
  row?: FormItem[];
}

interface FormProps {
  fields: FormItem[];
  buttonText: string;
  title: string;
  onClick: Function;
  formError: string | null;
  login?: boolean;
}

class FormCreator extends React.Component<FormProps> {
  state = { fields: {}, errors: {} };

  initializeState = () => {
    let values = {};

    this.props.fields.forEach(field => {
      if (field.row) {
        field.row.forEach(item => {
          values = { ...values, [item.label]: '' };
        });
      } else {
        values = { ...values, [field.label]: '' };
      }
    });

    this.setState({ fields: values });
  };

  componentDidMount() {
    this.initializeState();
  }

  renderFields = (): JSX.Element[] => {
    return this.props.fields.map((item: FormItem) => {
      return (
        <FormField
          onChangeValue={this.handleChangeValue}
          key={item.label}
          field={item}
          error={this.state.errors}
        />
      );
    });
  };

  renderForgotPass = (): JSX.Element => {
    return (
      <p style={{ cursor: 'pointer' }} className="form-sub-text">
        Forgot your password?
      </p>
    );
  };

  handleChangeValue = (e: any) => {
    this.setState({
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value
      }
    });
  };

  onClick = (e: any) => {
    e.preventDefault();

    if (this.formValidate()) {
      this.props.onClick(this.state.fields);
    }
  };

  formValidate = (): boolean => {
    let sendForm = true;
    let errors = {};

    this.props.fields.forEach(field => {
      if (field.row) {
        field.row.forEach(item => {
          if (this.state.fields[item.label].trim().length === 0) {
            sendForm = false;
            errors = {
              ...errors,
              [item.placeholder]: `Invalid ${item.placeholder}`
            };
          }
        });
      } else {
        if (this.state.fields[field.label].trim().length === 0) {
          sendForm = false;
          errors = {
            ...errors,
            [field.placeholder]: `Invalid ${field.placeholder}`
          };
        }
      }
    });

    this.setState({ errors: errors });
    return sendForm;
  };

  render() {
    return (
      <form>
        <h1 className="form-title">{this.props.title}</h1>
        {this.renderFields()}
        {this.props.login ? this.renderForgotPass() : null}
        {this.props.formError ? (
          <p className="form-error form-error-submit">{this.props.formError}</p>
        ) : null}
        <button onClick={this.onClick} className="form-button-green">
          {this.props.buttonText}
        </button>
      </form>
    );
  }
}

export default FormCreator;
