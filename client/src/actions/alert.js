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

//ex of calling this action(in Reg.js)
//line: 27 of Register.js do: pass msg here(4) then generate id(5) & dispatch set alert with that msg, alertType & id 
//Alert system setup done(& interaction between actions and reducers)
