import isEmpty from 'lodash/isEmpty';

import { SET_CURRENT_USER } from '../components/actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default (state = initialState,
  action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
      };
    default: return state;
  }
};
