import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR
} from '../actions/types';

const initialState = {     //It will gonna have obj
  token: localStorage.getItem('token'),   //token that we get back, store token in localStorage, access it with just vanillaJS by look for an item in localStorage cld token
  isAuthenticated: null,  //begin with null(for only login users can see all stuffs)
  loading: true,          //by def T,once we make req & get response then set that to false(to know that its been loaded)
  user: null              //when we make req to BE to api/auth, we get user data
  //so thats our state for authentication
};

function authReducer (state = initialState, action) {
  const { type, payload } = action;  //destructure

  switch (type) { 
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,  // it means user token worked, we were now loggedin. So set loading to F
        loading: false,
        user: payload    // cause payload includes user includes everything except password coz of -password in bE
      }
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,   //ret whatever in state as state is immutable
        ...payload,
        isAuthenticated: true,
        loading: false  //coz we get the res & it's been loaded
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:   //do same thimg as reg_fail(remove token, clear all off the state)
      localStorage.removeItem('token');   //clear token from ls, we don't want token that is not valid
      return {
        ...state,
        token: null,
        isAuthenticated: true,
        loading: false,
      };
    default:
      return state;
  }
}

export default authReducer;

//Now we r working with HTTP req(dealing with BE,alerts had nothing to do with BE, it's all react)
