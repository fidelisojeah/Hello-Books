import bookCategoryListReducerComponent from
  '../../src/reducers/bookCategoryListReducer';

import { bookCategoryListReducer } from
  '../__mock__/mockStoreData';

describe('BOOK CATEGORY REDUCER', () => {
  test('should return initial state', () => {
    expect(bookCategoryListReducerComponent(
      undefined, {}))
      .toEqual({
        bookCategories: [],
        error: null
      });
  });
  test('should return book category', () => {
    expect(bookCategoryListReducerComponent([], {
      type: 'VIEW_CATEGORY_LIST_SUCCESS',
      response: {
        bookCategories: bookCategoryListReducer.bookCategories
      }
    }))
      .toEqual({
        error: null,
        bookCategories:
          bookCategoryListReducer.bookCategories
      });
  });
  test('should return category created successfully', () => {
    expect(bookCategoryListReducerComponent(
      bookCategoryListReducer, {
        type: 'CATEGORY_CREATE_COMPLETE',
        response: {
          categoryId: 4,
          categoryName: 'Property'
        }
      }
    )).toEqual({
      bookCategories: [
        {
          id: 1,
          categoryName: 'Adventure'
        },
        {
          id: 2,
          categoryName: 'Drama'
        },
        {
          id: 3,
          categoryName: 'History'
        },
        {
          id: 4,
          categoryName: 'Property'
        },
      ]
    });
  });
  test('should return category deleted successfully', () => {
    expect(bookCategoryListReducerComponent(
      bookCategoryListReducer, {
        type: 'DELETE_CATEGORY_SUCCESS',
        response: 3
      }
    )).toEqual({
      error: null,
      bookCategories: [
        {
          id: 1,
          categoryName: 'Adventure'
        },
        {
          id: 2,
          categoryName: 'Drama'
        }]
    });
  });
});
