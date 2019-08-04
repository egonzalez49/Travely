import React from 'react';
import { FormItem } from './FormCreator';

interface FormFieldProps {
  field: FormItem;
  onChangeValue: any;
  error: any;
}

class FormField extends React.Component<FormFieldProps> {
  renderRow = (): JSX.Element[] | undefined => {
    if (this.props.field.row)
      return this.props.field.row.map((item: FormItem) => {
        return (
          <div key={item.label} className="form-field-row">
            {/* <label className="form-label">{label}</label> */}
            <input
              name={item.label}
              className={
                this.props.error[item.placeholder]
                  ? 'input-error form-input'
                  : 'form-input'
              }
              type="text"
              placeholder={item.placeholder}
              onChange={this.props.onChangeValue}
            />
            {this.props.error[item.placeholder] ? (
              <p className="form-error">{this.props.error[item.placeholder]}</p>
            ) : null}
          </div>
        );
      });
  };

  renderField = () => {
    const { placeholder } = this.props.field;

    if (this.props.field.textArea) {
      return (
        <textarea
          name={this.props.field.label}
          className={
            this.props.error[placeholder]
              ? 'input-error form-input'
              : 'form-input'
          }
          placeholder={placeholder}
          onChange={this.props.onChangeValue}
          rows={4}
        />
      );
    } else {
      return (
        <input
          name={this.props.field.label}
          className={
            this.props.error[placeholder]
              ? 'input-error form-input'
              : 'form-input'
          }
          type={this.props.field.type ? this.props.field.type : 'text'}
          placeholder={placeholder}
          onChange={this.props.onChangeValue}
        />
      );
    }
  };

  render() {
    if (this.props.field.row) {
      return <div className="form-field-row-container">{this.renderRow()}</div>;
    }

    const { placeholder } = this.props.field;

    return (
      <div className="form-field">
        {this.renderField()}
        {this.props.error[placeholder] ? (
          <p className="form-error">{this.props.error[placeholder]}</p>
        ) : null}
      </div>
    );
  }
}

export default FormField;
