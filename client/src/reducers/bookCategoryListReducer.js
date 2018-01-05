import {
  VIEW_CATEGORY_LIST_SUCCESS,
  DELETE_CATEGORY_SUCCESS,
  CATEGORY_CREATE_COMPLETE
} from '../components/actions/types';
/**
 *
 * @param {object} state
 *
 * @param {object} action
 *
 * @returns {object} new state
 */
export default function bookCategoryListReducer(state = {
  error: null,
  bookCategories: []
}, action) {
  switch (action.type) {
    case VIEW_CATEGORY_LIST_SUCCESS: {
      return {
        ...state,
        bookCategories: action.response.bookCategories,
        error: null
      };
    }
    case DELETE_CATEGORY_SUCCESS: {
      return {
        ...state,
        bookCategories:
          state
            .bookCategories
            .filter(bookCategory =>
              bookCategory.id !== parseInt(action.response, 10)
            ),
        error: null
      };
    }
    case CATEGORY_CREATE_COMPLETE: {
      return {
        ...state,
        bookCategories: [
          ...state.bookCategories,
          {
            id: action.response.categoryId,
            categoryName: action.response.categoryName
          }
        ]
      };
    }
    default:
      return state;
  }
}
