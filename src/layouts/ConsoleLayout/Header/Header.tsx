import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {Layout} from 'antd';
import classNames from 'classnames';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import styles from './Header.module.less';
import Profile from './Profile';
import {selectSidebarIsOpen, toggleSidebar} from '@/redux/slices/layout';

interface Props {
  signOut?: Function;
}

export default function Header({ signOut }: Props): JSX.Element {
  const dispatch = useDispatch();
  const collapsed = useSelector(selectSidebarIsOpen);
  const IconComponent = collapsed ? MenuUnfoldOutlined : MenuFoldOutlined;
  return (
    <Layout.Header
      className={classNames([styles.header, { [styles.sidebarCollapsed]: collapsed }])}
    >
      <IconComponent className={styles.toggle} onClick={() => dispatch(toggleSidebar())} />

      <Profile signOut={signOut} />
    </Layout.Header>
  );
}
