import React from 'react';
import { Field } from 'react-final-form';
import { defineMessages, useIntl } from 'react-intl';

import Select, { Option } from '../Select';

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export const genderMessages = defineMessages({
  label: 'Gender',
  Male: 'Male',
  Female: 'Female',
  Other: 'Other',
});
const GenderField = (props: { name: string }) => {
  const intl = useIntl();
  return (
    <Field
      name={props.name}
      component={Select}
      type="text"
      label={intl.formatMessage(genderMessages.label)}
    >
      <Option value={Gender.Female}>{intl.formatMessage(genderMessages.Female)}</Option>
      <Option value={Gender.Male}>{intl.formatMessage(genderMessages.Male)}</Option>
      <Option value={Gender.Other}>{intl.formatMessage(genderMessages.Other)}</Option>
    </Field>
  );
};

GenderField.defaultProps = {
  name: 'gender',
};

export default GenderField;
