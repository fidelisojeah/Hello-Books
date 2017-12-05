import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';

import App from './components/App';
import Signin from './components/pages/Signin';
import StockMgtPage from './components/pages/admin/StockMgtPage';
import ViewBook from './components/pages/ViewBook';
import SuccessPage from './components/pages/SuccessPage';
import LogIndex from './components/pages/LogIndex';
import ViewAllBooks from './components/pages/ViewAllBooks';

const Main = () => (
  <App>
    <Switch>
      <Route path="/signin" component={Signin} />
      <PrivateRoute path="/success" Component={SuccessPage} />
      <PrivateRoute exact path="/" Component={LogIndex} />
      <PrivateRoute exact path="/books" Component={ViewAllBooks} />
      <PrivateRoute exact path="/books/:bookId" Component={ViewBook} />
      <PrivateRoute exact path="/bookmgt" Component={StockMgtPage} />
    </Switch>
  </App>
);

export default Main;
