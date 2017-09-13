import React from 'react';
import {
  //  BrowserRouter as Router,
  Route,
  // IndexRoute,
  //  browserHistory,
  Switch,
} from 'react-router-dom';

import App from './components/App';
import Signin from './components/pages/Signin';
import SuccessPage from './components/pages/SuccessPage';

const Main = () => (
  <App>
    <Switch>
      <Route path="/signin" component={Signin} />
      <Route path="/success" component={SuccessPage} />
    </Switch>
  </App>
);

export default Main;
