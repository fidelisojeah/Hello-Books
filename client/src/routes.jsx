import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import App from './components/App';
import Signin from './components/pages/Signin';
import StockMgtPage from './components/pages/admin/StockMgtPage';
import ViewBook from './components/pages/ViewBook';
import SuccessPage from './components/pages/SuccessPage';
import LogIndex from './components/pages/LogIndex';

const Main = () => (
  <App>
    <Switch>
      <Route path="/signin" component={Signin} />
      <Route path="/success" component={SuccessPage} />
      <Route exact path="/books" component={LogIndex} />
      <Route exact path="/books/:bookId" component={ViewBook} />
      <Route path="/bookmgt" component={StockMgtPage} />
    </Switch>
  </App>
);

export default Main;
