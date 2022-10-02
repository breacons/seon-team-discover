import { Avatar, Divider } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

import { URL_MAIN } from '../../../../url';
import benefitsIcon from './image/zero-icon.svg';
import benefitsTextLogo from './image/zero-text-logo.svg';
import styles from './Logo.module.less';
interface Props {
  collapsed: boolean;
}

export const Logo = ({}: Props) => {
  return (
    <div className={classNames([styles.container])}>
      <Link to={URL_MAIN} className={classNames([styles.link])}>
        <Avatar
          shape="square"
          size={48}
          src={benefitsIcon}
          alt="Vern Logo"
          className={styles.avatar}
        />
        <Divider type="vertical" className={styles.divider} />
        <img src={benefitsTextLogo} className={styles.benefitsText} alt="Benefits" />
      </Link>
    </div>
  );
};

export default Logo;
