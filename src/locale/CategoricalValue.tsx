import React from 'react';
import { useIntl } from 'react-intl';

export const CategoricalValue = ({ value, dictionary }: { value?: any; dictionary }) => {
  const intl = useIntl();
  if (!value || !Object.keys(dictionary).includes(value)) {
    return <>-</>;
  }

  return <>{intl.formatMessage(dictionary[value])}</>;
};

export default CategoricalValue;
