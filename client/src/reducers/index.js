import { combineReducers } from '@reduxjs/toolkit';    // we're gonna have multiple reducers but we bring Combine Reducers.
import  alert  from './alert';

//export it & then this just takes in an object that will have any reducers we create. So for instance, we'll create a an auth reducer here and we'll just bring that in and add it here
export default combineReducers({
  alert
});   

//thats our rootReducer file
