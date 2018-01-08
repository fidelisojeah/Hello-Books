import authorReducer from '../../src/reducers/authorReducer';

describe('AUTHOR CREATION REDUCER', () => {
  test('should return initial state', () => {
    expect(authorReducer(undefined, {}))
      .toEqual({ authorCreated: false, error: {} });
  });
  test('should return author created success', () => {
    expect(authorReducer(
      [], {
        type: 'AUTHOR_CREATED_SUCCESS',
      })).toEqual({
        authorCreated: true,
        error: {}
      });
  });
  test('should return author created failure', () => {
    expect(authorReducer(
      [], {
        type: 'AUTHOR_CREATED_FAILURE',
        error: {
          error: 'Author could not be created'
        }
      }
    )).toEqual({
      error: {
        error: 'Author could not be created'
      }
    });
  });
});
