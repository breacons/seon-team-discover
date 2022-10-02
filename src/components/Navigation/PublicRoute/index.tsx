import React, { ReactElement } from 'react';
import { Navigate, Route, RouteProps, useLocation } from 'react-router-dom';

import { getRedirectUrlFromParams } from '../redirect';

type StateProps = {};
type OwnProps = {
  redirect: string;
} & RouteProps;

type Props = StateProps & OwnProps;

function PublicRoute(props: Props): ReactElement {
  const { redirect, ...rest } = props;
  const location = useLocation();

  return <Route {...rest} />;

  if (true) return <Route {...rest} />;

  if (location) {
    const currentUrl = `${location.pathname}${location.search}`;
    const redirectFromParam = getRedirectUrlFromParams(currentUrl);

    return redirectFromParam !== currentUrl ? (
      <Navigate to={redirectFromParam} />
    ) : (
      <Navigate to={redirect} />
    );
  }

  return <Navigate to={redirect} />;
}

export default PublicRoute;
