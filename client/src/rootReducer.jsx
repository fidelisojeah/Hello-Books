import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import bookReducer from './reducers/bookReducers';
import singleBookReducer from './reducers/singleBookReducer';
import bookHistoryReducer from './reducers/bookHistoryReducer';
import borrowHistoryReducer from './reducers/borrowHistoryReducer';
import homeBooksReducer from './reducers/homeBooksReducer';
import authorReducer from './reducers/authorReducer';
import userActionReducer from './reducers/userActionsReducer';

import auth from './reducers/auth';

const rootReducer = combineReducers(
  {
    auth,
    authorReducer,
    bookHistoryReducer,
    bookReducer,
    borrowHistoryReducer,
    flashMessages,
    homeBooksReducer,
    singleBookReducer,
    userActionReducer,
  }
);
export default rootReducer;
