import userActionReducer from
  '../../src/reducers/userActionReducer';

describe('USER ACTION REDUCER', () => {
  test('should return initial state', () => {
    expect(userActionReducer(
      undefined, {}))
      .toEqual({
        error: {},
        message: {}
      });
  });
  test('should render verified user successfully', () => {
    expect(userActionReducer(
      undefined, {
        type: 'VERIFY_USER_SUCCESS',
        verified: {
          message: 'User Verified Successfully'
        }
      }))
      .toEqual({
        message: {
          message: 'User Verified Successfully'
        },
        error: {}
      });
  });
  test('should render verified user Failure', () => {
    expect(userActionReducer(
      undefined, {
        type: 'VERIFY_USER_FAILURE',
        error: {
          data: {
            message: 'User verification Failure'
          }
        }
      }))
      .toEqual({
        error: {
          message: 'User verification Failure'
        },
        message: {}
      });
  });
});
