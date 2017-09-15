import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import jwtDecode from 'jwt-decode';
import {
  BrowserRouter as Router,
  browserHistory,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import { setCurrentUser } from './components/actions/login';
import rootReducer from './rootReducer';
import Main from './routes';
import setAuthorizationToken from './utils/setAuthToken';

import './style.scss';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);
if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
} else {
  store.dispatch(setCurrentUser({}));
}
// import routes from './routes';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Main />
    </Router>
  </Provider>,
  document.getElementById('main'),
);

/*
<App>
      <Switch>
        <Route path="/signin" component={Signin} />
      </Switch>
    </App>

    <Route path="/login" component={LoginPage} />
    <Route exact path="/" component={Navbar} />
    function component() {
  const element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');
  return element;
}

document.body.appendChild(component());
*/
