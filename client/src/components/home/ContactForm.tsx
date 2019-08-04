import React from 'react';
import FormCreator from '../form/FormCreator';
import { contactFields } from '../form/formFields';
import horizontalDots from '../../styles/images/dots-horizontal.svg';
import verticalDots from '../../styles/images/dots-vertical.svg';

class ContactForm extends React.Component {
  onClick = () => {};

  render() {
    return (
      <div className="auth-form">
        <FormCreator
          fields={contactFields}
          buttonText="Send"
          title="contact us"
          formError={null}
          onClick={this.onClick}
        />
        <img
          className="vertical-dots-alt"
          src={verticalDots}
          alt="vertical design dots"
        />
        <img
          className="horizontal-dots-alt"
          src={horizontalDots}
          alt="horizontal design dots"
        />
      </div>
    );
  }
}

export default ContactForm;
