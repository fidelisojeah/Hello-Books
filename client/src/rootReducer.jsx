import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';

const rootReducer = combineReducers({ flashMessages });
export default rootReducer;
