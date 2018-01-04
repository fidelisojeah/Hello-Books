import {
  VERIFY_USER_SUCCESS,
  VERIFY_USER_FAILURE,
} from '../components/actions/types';

/**
 *
 * @param {object} state
 *
 * @param {object} action
 *
 * @returns {object} new state
 */
export default function userActionReducer(state = {
  error: {},
  message: {}
}, action) {
  switch (action.type) {
    case VERIFY_USER_SUCCESS: {
      return {
        ...state,
        message: action.verified
      };
    }
    case VERIFY_USER_FAILURE: {
      return {
        ...state,
        error: action.error.data
      };
    }
    default:
      return state;
  }
}
