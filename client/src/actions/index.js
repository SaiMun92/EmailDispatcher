import axios from 'axios';
import { FETCH_USER } from './types';
// These are called action creators
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');

    dispatch({ type: FETCH_USER, payload: res.data });
  };

// This below uses a promise instead of the async await syntax
// export const fetchUser = () => {
//   return function(dispatch) {
//     axios.get('/api/current_user')
//       .then(res => dispatch({ type: FETCH_USER, payload: res }));
//   };
// };

export const handleToken = (token) => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  // The line below handles the response
  dispatch({ type: FETCH_USER, payload: res.data });
};
