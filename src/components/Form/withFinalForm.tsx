import { Form } from 'antd';
import React, { ReactElement, ReactNode, useState } from 'react';
import { FieldInputProps, FieldMetaState } from 'react-final-form';

export interface WithFinalFormProps {
  input: FieldInputProps<any>;
  meta: FieldMetaState<any>;
  children?: ReactElement | Array<ReactElement>;
  label: string | ReactNode;
  helperText?: string | ReactNode;
  required?: boolean;
}

export const withFinalForm =
  (Component: any, valueField?: string, defaultValueField?: string) =>
  ({
    input: { id, name, onChange, value, type, ...inputProps },
    helperText,
    meta,
    label,
    children,
    required,
    ...rest
  }: WithFinalFormProps) => {
    const [childrenTouched, setChildrenTouched] = useState(false);

    const mappedValue = {
      [valueField || 'value']: value,
      [defaultValueField || 'defaultValue']: value,
    };

    return (
      <Form.Item
        label={
          <span>
            {label}
            {required && '*'}
          </span>
        }
        validateStatus={meta.error && (meta.touched || childrenTouched) ? 'error' : ''}
        help={meta.touched || childrenTouched ? meta.error || helperText : helperText || undefined}
        colon={false}
      >
        <Component
          id={id}
          type={type}
          name={name}
          {...mappedValue}
          disabled={false}
          onChange={onChange}
          {...inputProps}
          {...rest}
        >
          {children &&
            React.Children.map(children, (child) =>
              React.cloneElement(child, { onBlur: () => setChildrenTouched(true) }),
            )}
        </Component>
      </Form.Item>
    );
  };

export default withFinalForm;
