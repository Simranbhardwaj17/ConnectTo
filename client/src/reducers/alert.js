import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

function alertReducer(state = initialState, action) {
  const { type, payload } = action;      //destructure, no need to write action.type or a.payload

  switch (type) {    //switch case
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);      //filter alert to remove specific alert by its id (remove all alert except that matches payload)
    default:          // in every reducer, it is must to ret state
      return state;     
  }
}

export default alertReducer;









// in alert js

// this is gonna be our reducer, which is gonna

// it's just a function that takes in a piece of state, okay?

// Any state that has to do with alerts and an action.

// Okay? An action is gonna get dispatched from an actions file

// which is a little weird

// but I'll try to explain it as we move along.