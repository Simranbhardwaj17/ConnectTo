import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {   //coz of thunk middleware we r able to use double arrow
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,        //dispatch it with data 
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};