import {
  DashboardOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  GiftOutlined,
  ClockCircleOutlined,
  BlockOutlined,
  LikeOutlined,
  BarChartOutlined,
  ExportOutlined
} from "@ant-design/icons";
import {Button, Layout, Menu} from "antd";
import classNames from "classnames";
import { filter as _filter, identity as _identity, map as _map } from "lodash";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { URL_CLIENT_LIST, URL_FAMILY_LIST, URL_MAIN } from "src/url";

// import { getMe } from '../../../redux/session';
import { Logo } from "./Logo";
import MenuItem from "./MenuItem";
import styles from "./Sidebar.module.less";
import {
  changeSubmenus,
  closeSidebar,
  selectSidebarIsOpen,
  selectSidebarSubmenus,
} from "@/redux/slices/layout";

const { SubMenu } = Menu;

const getMainRouter = (route: string) => `/${route.split("/")[1]}`;

const AdminMenu = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <Menu
      defaultSelectedKeys={[URL_MAIN]}
      selectedKeys={[location.pathname]}
      mode="inline"
      defaultOpenKeys={useSelector(selectSidebarSubmenus)}
      onOpenChange={(openKeys) => {
        const keys = _map(_filter(openKeys, _identity), (key) =>
          key.toString()
        );
        dispatch(changeSubmenus({ keys }));
      }}
    >
      <MenuItem
        key={'/console/setup'}
        href={'/console/setup'}
        title={<FormattedMessage defaultMessage="Settings" id="dashboard" />}
        icon={<BlockOutlined />}
      />
      <MenuItem
        key={'/console/customers'}
        href={'/console/customers'}
        title={<FormattedMessage defaultMessage="Clients" id="dashboard" />}
        icon={<UsergroupAddOutlined />}
      />
      <MenuItem
        key={'/console/donations'}
        href={'/console/donations'}
        title={<FormattedMessage defaultMessage="Donations" id="dashboard" />}
        icon={<GiftOutlined />}
      />
      <MenuItem
        key={'/console/appointments'}
        href={'/console/appointments'}
        title={<FormattedMessage defaultMessage="Appointments" id="dashboard" />}
        icon={<ClockCircleOutlined />}
      />
      <MenuItem
        disabled
        key={'/console/volunteers'}
        href={'/console/volunteers'}
        title={<FormattedMessage defaultMessage="Volunteers" id="dashboard" />}
        icon={<LikeOutlined />}
      />
      <MenuItem
        disabled
        key={'/console/report'}
        href={'/console/report'}
        title={<FormattedMessage defaultMessage="Report" id="dashboard" />}
        icon={<BarChartOutlined />}
      />


    </Menu>
  );
};

export default function Sidebar(): JSX.Element {
  const collapsed = !useSelector(selectSidebarIsOpen);

  const dispatch = useDispatch();

  const handleResize = (broken: boolean) => {
    if (broken && !collapsed) {
      dispatch(closeSidebar());
    }
  };

  return (
    <Layout.Sider
      className={classNames(styles.sidebar, {
        [styles.sidebarCollapsed]: collapsed,
      })}
      width={280}
      collapsed={collapsed}
      breakpoint="sm"
      onBreakpoint={handleResize}
    >
      <Logo collapsed={collapsed} />
      <AdminMenu />
    </Layout.Sider>
  );
}
