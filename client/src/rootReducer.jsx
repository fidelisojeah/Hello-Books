import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';

const rootReducer = combineReducers({ flashMessages, auth });
export default rootReducer;
