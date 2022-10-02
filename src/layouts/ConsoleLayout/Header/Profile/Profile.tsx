import { LogoutOutlined, SettingOutlined, ExportOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Typography } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import styles from './Profile.module.less';
import { useProfile } from '@/hooks/user';
import { User } from '@/interfaces/user';
import { useNavigate } from 'react-router-dom';

interface Props {
  signOut?: Function;
}

export const Profile = ({ signOut }: Props) => {
  const me = useProfile() as User;
  const navigate = useNavigate();

  const handleSignOut = async () => {
    if (signOut) {
      signOut();
    }
  };

  return (
    <div>
      <Dropdown
        overlay={() => (
          <Menu>
            <Menu.Divider />
            <Menu.Item onClick={() => handleSignOut()}>
              <LogoutOutlined style={{ marginRight: 6 }} />
              <FormattedMessage id="UserLayout.Header.Profile.LogOut" defaultMessage="Sign out" />
            </Menu.Item>
          </Menu>
        )}
      >
        <div className={styles.profile}>
          {/*<Avatar size="small" icon={<UserOutlined />} src={me?.avatar} className={styles.avatar} />*/}
          <div className={styles.text}>
            <Typography.Text className={styles.name} strong>
              <FormattedMessage
                id="UserLayout.Header.Profile.Name"
                defaultMessage="{firstName} {lastName}"
                values={{
                  lastName: me?.lastName,
                  firstName: me?.firstName,
                }}
              />
            </Typography.Text>
            <Typography.Text className={styles.email}>{me?.email}</Typography.Text>
          </div>
        </div>
      </Dropdown>
    </div>
  );
};

export default Profile;
