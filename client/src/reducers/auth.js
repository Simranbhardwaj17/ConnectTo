import {
  REGISTER_SUCCESS,
  REGISTER_FAIL
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
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,   //ret whatever in state as state is immutable
        ...payload,
        isAuthenticated: true,
        loading: false  //coz we get the res & it's been loaded
      };
    case REGISTER_FAIL:
      localStorage.removeItem('token');
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
