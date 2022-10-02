import React from 'react';
import { defineMessages } from 'react-intl';
import { User } from '@/interfaces/user';
import intl from '@/lib/intl';

const messages = defineMessages({
  name: '{lastName} {firstName}',
  deleted: 'Törölt felhasználó',
});
interface UserLike extends Pick<User, 'firstName' | 'lastName'> {
  deletedAt?: Date | null;
}
export const toUserName = (user?: UserLike): string => {
  if (!user) {
    return '-';
  }

  if (user.deletedAt) {
    return intl().formatMessage(messages.deleted);
  }
  return intl().formatMessage(messages.name, {
    firstName: user.firstName,
    lastName: user.lastName,
  });
};
export const UserName = (props: { user?: UserLike }): React.ReactElement => {
  const { user } = props;
  return <>{toUserName(user)}</>;
};
