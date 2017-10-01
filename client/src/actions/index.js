import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';
// These are called action creators
export const fetchUser = () => async dispatch => {
    let res = await axios.get('/api/current_user');

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

export const submitSurvey = (values, history) => async dispatch =>{
  const res = await axios.post('/api/surveys', values);

  history.push('/surveys'); // redirect the user cos SurveyFormReview don't know about react router
  dispatch({ type: FETCH_USER, payload: res.data });
};


export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
