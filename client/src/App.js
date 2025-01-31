import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

// Redux
import { Provider } from 'react-redux';  //Provider connects the two, because Redux is a separate, it's separate from React but this will combine them together. And we can do that by surrounding our entire app inside with this provider
import store from './store';

import './App.css';

const App = () => ( 
  <Provider store={store}>
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  </Provider>
);

export default App;