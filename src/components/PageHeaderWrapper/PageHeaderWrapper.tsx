import { PageHeader } from 'antd';
import { PageHeaderProps } from 'antd/es/page-header';
import classNames from 'classnames';
import React, { PropsWithChildren, ReactNode } from 'react';

import If from '../If';
import styles from './PageHeaderWrapper.module.less';
import { PageTitle } from '@/components/Header';

interface PageHeaderWrapperProps extends PageHeaderProps {
  title: string;
  content?: ReactNode;
  reportLayout?: boolean;
}
const PageHeaderWrapper = ({
  children,
  content,
  reportLayout = false,
  ...restProps
}: PropsWithChildren<PageHeaderWrapperProps>) => {
  return (
    <>
      <PageTitle title={restProps.title} />
      {/*<If*/}
      {/*  condition={reportLayout}*/}
      {/*  then={() => (*/}
      {/*    <div className={styles.breadcrumbWrapper}>*/}
      {/*      <Breadcrumb />*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*/>*/}
      <div className="page-header-wrapper">
        <PageHeader
          {...restProps}
          className={classNames({ [styles.reportLayoutPageHeader]: reportLayout })}
        >
          {content && <div className={styles.content}>{content}</div>}
        </PageHeader>
        {children && (
          <div className={classNames({ [styles.children]: !reportLayout })}>{children}</div>
        )}
      </div>
    </>
  );
};
export default PageHeaderWrapper;
