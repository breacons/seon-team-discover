import { Col, Row } from 'antd';
import React, { ReactElement } from 'react';

import withFinalForm from '../withFinalForm';
import styles from './CardSelect.module.less';

interface Props {
  children: ReactElement | ReactElement[];
  value: string;
  onChange: Function;
}

export const CardSelect = withFinalForm(({ children, onChange, value }: Props) => (
  <Row gutter={24} className={styles.container}>
    {React.Children.map(children, (child) => {
      return <Col span={6}>{React.cloneElement(child, { selectedValue: value, onChange })}</Col>;
    })}
  </Row>
));

export default CardSelect;
