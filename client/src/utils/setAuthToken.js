import axios from "axios";        //we r not making req with axios, we r just adding a global header

// store our JWT in LS and set axios headers if we do have a token

const setAuthToken = (token) => {         //create fn & token as param(just gonna check for it) & it come from localstorage
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
    // localStorage.setItem('token', token);
  } else {
    delete axios.defaults.headers.common['x-auth-token'];    //we r doing coz when we have a token, we r just gonna send it with every req instead of picking & choosing which req to send it with
    // localStorage.removeItem('token');
  }
};

export default setAuthToken;
//Its just a fn that takes in a token. If the token is there, then it's gonna add it to header, if not , it gonna dlt it from headers