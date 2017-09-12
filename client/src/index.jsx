import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  browserHistory,
  Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import Signin from './components/pages/Signin';
import App from './components/App';
import './style.scss';

const store = createStore(
  (state = {}) => state,
  applyMiddleware(thunk),
);

// import routes from './routes';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <App>
        <Switch>
          <Route path="/signin" component={Signin} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById('main'),
);

/*
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
