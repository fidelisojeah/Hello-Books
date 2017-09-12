import axios from 'axios';

/*
function userSignupRequest(userData) {
  return dispatch => {
    return axios.post('/api/v4/users/signup', userData);
  };
}
export default userSignupRequest;
*/

export function userSignupRequest(userData) {
  return dispatch => {
    return axios.post('/api/v4/users/signup', userData);
  };
}
// const userSignupRequest = (userData) => {
//   axios.post('/api/v4/users/signip', userData);
// };
// export default userSignupRequest(userData)
// export default userSignupRequest;
