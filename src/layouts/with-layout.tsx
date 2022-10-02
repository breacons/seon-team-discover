import React, { ReactNode } from 'react';
interface Props {
  children: ReactNode;
}
function withLayout<T>(LayoutComponent: React.ComponentType<T | Props>) {
  return function wrapComponent<T>(WrappedComponent: React.ComponentType<T>) {
    const Wrapper = (props: T) => {
      return (
        <LayoutComponent>
          <WrappedComponent {...props} />
        </LayoutComponent>
      );
    };
    Wrapper.displayName = `withLayout(${LayoutComponent.displayName})(${WrappedComponent.displayName})`;

    return Wrapper;
  };
}
export default withLayout;
