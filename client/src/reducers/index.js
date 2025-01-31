import { combineReducers } from 'redux';    // we're gonna have multiple reducers but we bring Combine Reducers.

//export it & then this just takes in an object that will have any reducers we create. So for instance, we'll create a an auth reducer here and we'll just bring that in and add it here
export default combineReducers({});   // But save this as just an empty object. But just by doing this, if I go back to our application you can see that the DevTools are now working because we have a store We don't have any reducers or state
