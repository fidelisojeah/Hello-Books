import isEmpty from 'lodash/isEmpty';

import {
  SET_CURRENT_USER,
  SIGN_IN_UNSUCCESSFUL
} from '../components/actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  error: {}
};

export default (state = initialState,
  action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER: {
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
      };
    }
    case SIGN_IN_UNSUCCESSFUL: {
      return {
        ...state,
        error: action.error.data
      };
    }
    default: return state;
  }
};
