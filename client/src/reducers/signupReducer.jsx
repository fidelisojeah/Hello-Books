export default function signupReducer(state = [], action) {
  switch (action.type) {
    case 'USER_SIGNUP':
      return [...state, Object.assign({}, action.course)];
    default:
      return state;
  }
}
