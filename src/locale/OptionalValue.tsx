import React from 'react';

export const OptionalValue = ({ value }: { value?: any }) => value || '-';

export default OptionalValue;
