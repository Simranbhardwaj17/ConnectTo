import React, { useEffect } from 'react';         //here,for fn(in general for classes), use useEff hook
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';  
// Redux
import { Provider } from 'react-redux';  //Provider connects the two, because Redux is a separate, it's separate from React but this will combine them together. And we can do that by surrounding our entire app inside with this provider
import store from './store';
import { loadUser } from './actions/auth';  //in order to run loadUser action bring here,  to call this use useEffect 
import setAuthToken from './utils/setAuthToken';

import './App.css';

if(localStorage.token) {   //it will only check the 1st time that the user loads. so run this in app.js as well
  setAuthToken(localStorage.token);
  }

//returning jsx in ()
const App = () => {
  //dispatch(mthd on the store) loadUser
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return ( 
  <Provider store={store}>
    <Router>
      <div>
        <Navbar />
        <Alert />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  </Provider>
)};

export default App;