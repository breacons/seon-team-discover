import React from 'react';
import { Field } from 'react-final-form';
import { defineMessages, useIntl } from 'react-intl';

import Input from '../Input';

const messages = defineMessages({
  placeholder: 'András',
  label: 'Keresztnév',
});
const FirstNameField = (props: { name: string }) => {
  const intl = useIntl();
  return (
    <Field
      name={props.name}
      component={Input}
      type="text"
      placeholder={intl.formatMessage(messages.placeholder)}
      label={intl.formatMessage(messages.label)}
    />
  );
};

FirstNameField.defaultProps = {
  name: 'firstName',
};

export default FirstNameField;
