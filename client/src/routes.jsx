import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';

import App from './components/App';
import UserLoginPage from './components/pages/LoginPage';
import StockMgtPage from './components/pages/admin/StockMgtPage';
import ConnectedViewByCategory from
  './components/pages/ViewByCategory';
import ViewBook from './components/pages/ViewBook';
import LogIndexPage from './components/pages/LogIndex';
import ConnectedProfilePage from './components/pages/ProfilePage';
import ViewAllBooksPage from './components/pages/ViewAllBooks';
import MultiPurposePage from './components/pages/MultiPurpose';

const Main = () => (
  <App>
    <Switch>
      <Route path="/signin" component={UserLoginPage} />
      <Route
        path="/user/:purpose"
        component={MultiPurposePage}
      />
      <PrivateRoute exact path="/" Component={LogIndexPage} />
      <PrivateRoute
        exact path="/books"
        Component={ViewAllBooksPage}
      />
      <PrivateRoute exact path="/profile" Component={ConnectedProfilePage} />
      <PrivateRoute exact path="/books/:bookId" Component={ViewBook} />
      <PrivateRoute exact path="/bookmgt" Component={StockMgtPage} />
      <PrivateRoute
        exact path="/categories"
        Component={ConnectedViewByCategory} />
      <PrivateRoute
        exact path="/categories/:categoryId"
        Component={ConnectedViewByCategory} />
    </Switch>
  </App>
);

export default Main;
