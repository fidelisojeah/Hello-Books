import { combineReducers } from 'redux';

import bookReducer from './reducers/bookReducers';
import singleBookReducer from './reducers/singleBookReducer';
import bookHistoryReducer from './reducers/bookHistoryReducer';
import borrowHistoryReducer from './reducers/borrowHistoryReducer';
import homeBooksReducer from './reducers/homeBooksReducer';
import authorReducer from './reducers/authorReducer';
import userActionReducer from './reducers/userActionReducer';
import categoryReducer from './reducers/categoryReducer';
import bookCategoryListReducer from './reducers/bookCategoryListReducer';
import allBooksReducer from './reducers/allBooksReducer';

import auth from './reducers/auth';

const rootReducer = combineReducers(
  {
    auth,
    authorReducer,
    bookHistoryReducer,
    bookReducer,
    borrowHistoryReducer,
    categoryReducer,
    homeBooksReducer,
    bookCategoryListReducer,
    allBooksReducer,
    singleBookReducer,
    userActionReducer,
  }
);
export default rootReducer;
