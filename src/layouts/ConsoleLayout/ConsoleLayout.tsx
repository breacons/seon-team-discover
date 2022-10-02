import { Layout } from 'antd';
import classNames from 'classnames';
import React, { ReactNode, useMemo } from 'react';
import { Outlet, useParams } from 'react-router-dom';

// import Breadcrumbs from '../../component/Breadcrumb';
import Header from './Header';
import Sidebar from './Sidebar';
import styles from './ConsoleLayout.module.less';
import {useProfile} from "@/hooks/user";
import {User} from "@/interfaces/user";
import {SpinnerOverlay} from "@/components/SpinnerOverlay";

const { Content } = Layout;

interface Props {
  signOut: Function;
  // children: ReactNode;
}

export interface ConsoleContext {

}

export default function ConsoleLayout({ signOut}: Props) {
  const slug = 'test'; // FIXME

  const me = useProfile() as User;

  return (

        <Layout className={styles.layout}>
          <Sidebar />
          <Layout>
            <Header signOut={signOut}/>
            <Content className={classNames([styles.content, styles.whiteBackground])}>
              <Outlet />
            </Content>
          </Layout>
        </Layout>

  );
}
