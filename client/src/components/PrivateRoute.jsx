import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      localStorage.jwtToken
        ? <Component {...props} />
        : <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location }
          }} />
    )} />
);
export default PrivateRoute;
