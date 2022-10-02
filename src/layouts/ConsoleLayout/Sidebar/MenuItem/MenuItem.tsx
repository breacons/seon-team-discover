import { Badge, Menu } from 'antd';
import { MenuItemProps } from 'antd/lib/menu/MenuItem';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import styles from './MenuItem.module.less';

interface Props extends MenuItemProps {
  href: string;
  title: string | ReactNode;
  icon?: React.ReactNode;
  count?: number;
}

export const MenuItem = ({ title, icon, href, count = 0, ...rest }: Props) => {
  return (
    <Menu.Item {...rest} style={{height: 50}}>
      <Link to={href}>
        <Badge dot count={count} className={styles.badge}>
          {icon}
        </Badge>
        <span className="menu-label" style={{fontWeight: 600}}>{title}</span>
      </Link>
    </Menu.Item>
  );
};

export default MenuItem;
