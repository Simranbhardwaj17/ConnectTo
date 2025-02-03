import axios from "axios";            //coz this is where we make our req 
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR  //for any authentication error
} from './types';
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = () => async (dispatch) => {  //we need to see if there is a token & if there then put it in a header in a global header. U know we have to send a header with x-auth-token, if we have token in local storage. I just wanna send that for that create a separarte file inside src "setAuthToken"
  if(localStorage.token) {   //it will only check the 1st time that the user loads. so run this in app.js as well
  setAuthToken(localStorage.token);
  }
  
  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/users', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;   //array is cld as errors

    if (errors) {  //check if there are any errors, then go through loop & pass a fn
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));   //Type is "danger for red"
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};