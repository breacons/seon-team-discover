import classNames from 'classnames';
import React, { ReactNode } from 'react';

import styles from './SectionTitle.module.less';
import If from '@/components/If';

interface Props {
  children: ReactNode;
  form?: boolean;
  right?: ReactNode;
}

export const SectionTitle = ({ children, form, right }: Props) => (
  <div className={classNames([styles.sectionTitle, { [styles.formTitle]: form }])}>
    {children}
    <If condition={right} then={() => right} />
  </div>
);

export default SectionTitle;
