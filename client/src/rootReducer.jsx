import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import bookReducer from './reducers/book-reducers';
import singleBookReducer from './reducers/single-book-reducer';
import bookHistoryReducer from './reducers/book-history-reducer';
import borrowHistoryReducer from './reducers/borrow-history-reducer';
import homeBooksReducer from './reducers/front-page-reducer';
import authorReducer from './reducers/author-reducer';
import userActionReducer from './reducers/user-actions-reducer';

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
