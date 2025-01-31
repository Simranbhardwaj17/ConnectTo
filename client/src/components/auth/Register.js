import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({     //useState hook(state, fn) //great about the useState hook is, I can just access the state from anywhere. I don't have to pass it in or anything like that. It's just available from this right here and I can just simply update it by calling set form data or set whatever the state is.
    //these r initial states
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  //destructure(no need to write like formData.name )
  const { name, email, password, password2 } = formData;

  //onChange fn
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });    // take whatever the value of the name attribute. So in that case it's name, in this case is it email, password,
        // and in order to do that, to use that as a key, we can put in some brackets and do e.target.name. So that way we can use this onchange for every field.

  const onSubmit = async (e) => {
    e.preventDefault();               // use curly braces here, we need to preventDefault since it's a submit, preventDefault.
    if (password !== password2) {         // So let's say if password is not equal to password2, then I'm just gonna do a console log for now. Ultimately we'll have an alert, but that's later on. So right now we're just gonna say passwords do not match else. Then let's console.log formData, Okay? Cause we have access to that state directly.
      console.log('Passwords do not match');
    } else {
      const newUser = {
        name,
        email,
        password
      }

      // we're gonna want to have a redux action to,

      // to make a request to the back end.

      // But I'm just gonna do it here before we even implement

      // Redux just to test it out.

      // So let's, let's bring in Axios.
      try {
        const config = {   //create config obj
          headers: {       //header obj
            'Content-Type': 'application/json'
          }
        }

        const body = JSON.stringify(newUser);

        const res = await axios.post('api/users', body, config);
        console.log(res.data);
      } catch(err) {
        console.error(err.response.data);
      }
    }
  };
  
  return (
    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}           //You provided a 'value' prop to a form field without an '/onChange handler'. This will render read-only field
            onChange={onChange}     //onChange handler to change value(fill name).   Now, become controlled component
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}   //call separate onChange fn
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
  );
};

export default Register;