import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import bookReducer from './reducers/book-reducers';
import auth from './reducers/auth';

const rootReducer = combineReducers(
  {
    bookReducer,
    flashMessages,
    auth
  });
export default rootReducer;
