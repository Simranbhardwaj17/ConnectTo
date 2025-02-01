import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { thunk } from 'redux-thunk';           // (Named Import)     //thunk is a middleware
import rootReducer from './reducers';

//here's where we actually create the store.

const initialState = {};         //All of our initial state will be in the reducers

const middleware = [thunk];  //create a variable called middleware and set that to an array. And the only middleware we have is Thunk.

const store = configureStore({      //create a variable called store set that to createStore, which we brought in from Redux. And this is gonna take in, first of all, the root reducer. and then the initialState, and then any middleware.
  reducer: rootReducer},
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))  //since we're using the DevTools extension, we can use composeWithDevTools And then that takes in the Apply middleware and inside Apply Middleware we just use the Spread Operator and add that middleware variable that we created.
);

export default store;