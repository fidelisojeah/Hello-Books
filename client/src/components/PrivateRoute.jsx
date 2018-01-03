import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

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
PrivateRoute.defaultProps = {
  location: {}
};
PrivateRoute.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object
  }),
};
export default PrivateRoute;
