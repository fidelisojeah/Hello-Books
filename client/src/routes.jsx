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
// import Logout from './components/pages/Logout';
import SuccessPage from './components/pages/SuccessPage';
import StockMgtPage from './components/pages/admin/StockMgtPage';

const Main = () => (
  <App>
    <Switch>
      <Route path="/signin" component={Signin} />
      <Route path="/success" component={SuccessPage} />
      {/* <Route path="/management" component={StockMgtPage} /> */}
    </Switch>
  </App>
);

export default Main;
