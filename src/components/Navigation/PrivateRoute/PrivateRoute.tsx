// import React, { Component, Fragment, ReactNode } from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate, Route, RouteProps, useLocation } from 'react-router-dom';
// import { getRedirectUrl } from '../redirect';
// import LoadingRoute from './LoadingRoute';
// import { isLoaded } from 'react-redux-firebase';
// import { URL_SIGN_IN } from '../../../url';
// import { RootState } from '@/redux/reducers';
//
// interface OwnProps extends RouteProps {
//   redirect?: string;
//   hasSignedOut?: null | boolean;
// }
//
// class RouteWrapper extends Component<RouteProps & { isLoading: boolean }> {
//   public render(): ReactNode {
//     const { isLoading, ...rest } = this.props;
//     return (
//       <LoadingRoute isLoading={isLoading}>
//         <Route {...rest} />
//       </LoadingRoute>
//     );
//   }
// }
//
// class PrivateRoute extends Component<OwnProps> {
//   public render(): ReactNode {
//     const auth = useSelector((state: RootState) => state.firebase.auth);
//     const location = useLocation();
//
//     const { redirect = URL_SIGN_IN, hasSignedOut, ...rest } = this.props;
//
//     if (isLoaded(auth) && !auth) {
//       return <Navigate to={getRedirectUrl(redirect, hasSignedOut ? undefined : location)} />;
//     }
//
//     if (!isLoaded(auth) || !auth) {
//       return <RouteWrapper isLoading={!isLoaded(auth)} {...rest} />;
//     }
//
//     return (
//       <Fragment>
//         <RouteWrapper isLoading={!isLoaded(auth)} {...rest} />
//       </Fragment>
//     );
//   }
// }
//
// export default PrivateRoute;

import React from 'react';
import { Navigate, Route, useLocation } from 'react-router-dom';
import If from '@/components/If';
import { URL_SIGN_IN } from '../../../url';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated or if auth is not
// yet loaded
function PrivateRoute2({ children, ...rest }: any) {
  const location = useLocation();
  return (
    <Route
      {...rest}
      element={
        <If
          condition={true}
          then={() => children}
          else={() => (
            <Navigate
              state={{ from: location }}
              to={{
                pathname: URL_SIGN_IN,
              }}
            />
          )}
        />
      }
    />
  );
}

export default PrivateRoute2;
