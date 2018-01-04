import {
  AUTHOR_CREATED_SUCCESS,
  AUTHOR_CREATED_FAILURE
} from '../components/actions/types';


/**
 *
 * @param {object} state
 *
 * @param {object} action
 *
 * @returns {object} new state
 */
export default function authorReducer(state = {
  authorCreated: false,
  error: {}
}, action) {
  switch (action.type) {
    case AUTHOR_CREATED_SUCCESS: {
      return {
        ...state,
        authorCreated: true,
        error: {}
      };
    }
    case AUTHOR_CREATED_FAILURE: {
      return {
        ...state,
        error: action.error
      };
    }
    default:
      return state;
  }
}
