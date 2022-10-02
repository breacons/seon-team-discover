import { Radio, Typography } from 'antd';
import classNames from 'classnames';
import React, { ReactNode, SyntheticEvent } from 'react';

import styles from './Option.module.less';

interface Props {
  value: string;
  label: string | ReactNode;
  description: string | ReactNode;
  selectedValue?: string;
  onChange?: React.EventHandler<any>;
  onBlur?: React.EventHandler<any>;
}

export const Option = ({ label, description, selectedValue, value, onChange, onBlur }: Props) => {
  const checked = selectedValue === value;

  const onClick = (event: SyntheticEvent) => {
    if (onChange) {
      onChange(value);
    }

    if (onBlur) {
      onBlur(event);
    }
  };

  return (
    <div
      onClick={(event) => onClick(event)}
      className={classNames([styles.card, { [styles.selected]: checked }])}
    >
      <Radio checked={checked} className={styles.label}>
        {label}
      </Radio>
      <Typography.Text type="secondary" className={styles.description}>
        {description}
      </Typography.Text>
    </div>
  );
};

export default Option;
