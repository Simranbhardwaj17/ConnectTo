import axios from "axios";            //coz this is where we make our req 
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';

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