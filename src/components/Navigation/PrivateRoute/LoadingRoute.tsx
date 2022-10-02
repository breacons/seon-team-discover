import { Spin } from 'antd';
import React from 'react';

export const LoadingRoute = ({ children, isLoading }: any) => (
  <Spin size="large" spinning={isLoading}>
    {children}
  </Spin>
);

export default LoadingRoute;
