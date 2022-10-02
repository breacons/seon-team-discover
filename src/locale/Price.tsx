import React, { Fragment } from 'react';
import intl from "@/lib/intl";

interface Props {
  currency?: string;
  amount?: number;
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
}

export const toPrice = (props: Props) => {
  const { currency = 'USD', amount = 0, ...rest } = props;

  if (amount !== null && currency) {
    return intl().formatNumber(amount / 100, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
      ...rest,
    });
  }

  return null;
};

export const Price = (props: Props) => {
  return <Fragment>{toPrice(props)}</Fragment>;
};
