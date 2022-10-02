import Modal from 'antd/es/modal';
import { defineMessages } from 'react-intl';
import intl from '@/lib/intl';

const { confirm } = Modal;

const leaveEditModalMessage = defineMessages({
  leaveEditModalMessageTitle: 'Biztosan el akarod hagyni az oldalt?',
  leaveEditModalMessageOk: 'Igen',
  leaveEditModalMessageCancel: 'Mégse',
});

export const showLeaveEdit = (goBack: () => void) =>
  confirm({
    title: intl().formatMessage(leaveEditModalMessage.leaveEditModalMessageTitle),
    okText: intl().formatMessage(leaveEditModalMessage.leaveEditModalMessageOk),
    cancelText: intl().formatMessage(leaveEditModalMessage.leaveEditModalMessageCancel),
    onOk() {
      goBack();
    },
  });
