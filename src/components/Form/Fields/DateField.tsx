import React, { ReactNode } from 'react';
import { Field } from 'react-final-form';

import DatePicker from '../DatePicker';
import { convertEmptyToNull } from './parse';

const DateField = (props: { name: string; label: ReactNode }) => {
  return (
    <Field
      name={props.name}
      component={DatePicker}
      type="text"
      parse={convertEmptyToNull}
      label={props.label}
    />
  );
};

DateField.defaultProps = {
  name: 'date',
};

export default DateField;
