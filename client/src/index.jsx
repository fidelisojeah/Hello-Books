import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  browserHistory,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import Main from './routes';

import './style.scss';

const store = createStore(
  (state = {}) => state,
  applyMiddleware(thunk),
);

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
