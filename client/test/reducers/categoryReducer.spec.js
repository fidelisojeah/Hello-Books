import categoryReducer from
  '../../src/reducers/categoryReducer';


describe('CATEGORY CREATION REDUCER', () => {
  test('should return initial state', () => {
    expect(categoryReducer(
      undefined, {}))
      .toEqual({
        newMessage: ''
      });
  });
  test('should return category created Successful', () => {
    expect(categoryReducer([], {
      type: 'CATEGORY_CREATE_COMPLETE',
      message: 'Category created successfully'
    }))
      .toEqual({
        error: null,
        newMessage: 'Category created successfully'
      });
  });
  test('should return category create rejection', () => {
    expect(categoryReducer([], {
      type: 'CATEGORY_CREATE_FAILURE',
      error: 'Unable to Create'
    }))
      .toEqual({
        error: 'Unable to Create'
      });
  });
});
