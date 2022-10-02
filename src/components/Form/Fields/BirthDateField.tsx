import React from 'react';
import { Field } from 'react-final-form';
import { defineMessages, useIntl } from 'react-intl';

import DatePicker from '../DatePicker';
import { convertEmptyToNull } from './parse';

const messages = defineMessages({
  label: 'Birthday',
});

const BirthDateField = (props: { name: string }) => {
  const intl = useIntl();
  return (
    <Field
      name={props.name}
      component={DatePicker}
      type="text"
      parse={convertEmptyToNull}
      label={intl.formatMessage(messages.label)}
      size="large"
    />
  );
};

BirthDateField.defaultProps = {
  name: 'birthDate',
};

export default BirthDateField;
