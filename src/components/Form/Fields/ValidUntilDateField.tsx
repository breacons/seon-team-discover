import React from 'react';
import { Field } from 'react-final-form';
import { defineMessages, useIntl } from 'react-intl';

import DatePicker from '../DatePicker';
import { convertEmptyToNull } from './parse';

const messages = defineMessages({
  label: 'Érvényesség vége',
});

const ValidUntilDateField = (props: { name: string }) => {
  const intl = useIntl();
  return (
    <Field
      name={props.name}
      component={DatePicker}
      type="text"
      parse={convertEmptyToNull}
      label={intl.formatMessage(messages.label)}
    />
  );
};

ValidUntilDateField.defaultProps = {
  name: 'validUntil',
};

export default ValidUntilDateField;
