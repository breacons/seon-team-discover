import { Col, Layout, Row } from 'antd';
import React, { ReactNode } from 'react';

import If from '@/components/If';
import styles from './AuthLayout.module.less';
interface Props {
  children: ReactNode;
  cover?: string;
}

const AuthLayout: React.FC<Props> = (props: Props) => {
  return (
    <Layout className={styles.layout}>
      <Row className={styles.row} align="middle" justify="space-around" gutter={16}>
        <Col xs={24} sm={12} className={styles.imageContainer}>
          <If
            condition={props.cover}
            then={() => <img className={styles.image} alt="Cover" src={props.cover} />}
          />
        </Col>
        <Col xs={24} sm={12} className={styles.contentContainer}>
          <div className={styles.content}>{props.children}</div>
        </Col>
      </Row>
    </Layout>
  );
};

AuthLayout.displayName = 'AuthLayout';

export default AuthLayout;
