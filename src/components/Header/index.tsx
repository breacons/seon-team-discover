import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { APP_URL } from '@/lib/config';

type PageTitleProps = {
  title: string;
};

const ZERO_HUB = 'Zero° Hub';
export function PageTitle({ title }: PageTitleProps) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}

export default function Header(): ReactElement {
  return (
    <Helmet titleTemplate={`%s - ${ZERO_HUB}`} defaultTitle={ZERO_HUB}>
      <meta charSet="utf-8" />
      <title>{ZERO_HUB}</title>
      {APP_URL && <link rel="canonical" href={APP_URL} />}
    </Helmet>
  );
}
