import React from 'react';
import { Field } from 'react-final-form';
import { defineMessages, useIntl } from 'react-intl';

import DatePicker from '../DatePicker';
import { convertEmptyToNull } from './parse';

const messages = defineMessages({
  label: 'Érvényesség kezdete',
});

const ValidFromDateField = (props: { name: string }) => {
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

ValidFromDateField.defaultProps = {
  name: 'validFrom',
};

export default ValidFromDateField;
