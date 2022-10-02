import dayjs from 'dayjs';
import React from 'react';
import { defineMessages } from 'react-intl';
import intl from '@/lib/intl';

const messages = defineMessages({
  format: 'YYYY.MM.DD.',
});

export const toLocaleDate = (value: any, format?: string) => {
  return dayjs(value).format(format ?? intl().formatMessage(messages.format));
};

export interface LocaleDateProps {
  date: any;
  format?: string;
}

export const LocaleDate = (props: LocaleDateProps) => {
  return <>{toLocaleDate(props.date, props.format)}</>;
};
