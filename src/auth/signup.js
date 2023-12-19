// signup.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUser } from '../redux/signupSlice';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.signup_admin.status);

  const [userData, setUserdata] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(userData));
  };

  const handleChange = (e) => {
    setUserdata({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  if (status === 'done') {
    return navigate('/home');
  }

  return (
    <div>
      <p>
        Sign Up
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username:
          <input
            className="form-input"
            type="text"
            name="text"
            placeholder="username"
            value={userData.username}
            onChange={handleChange}
            required
            id="username"
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            className="form-input"
            type="text"
            name="email"
            placeholder="joe@mail.com"
            value={userData.email}
            onChange={handleChange}
            required
            id="email"
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="*****"
            value={userData.password}
            onChange={handleChange}
            required
            id="password"
          />
        </label>
        <label htmlFor="password_confirmation">
          Confirm Password:
          <input
            className="form-input"
            type="password"
            name="password_confirmation"
            placeholder="****"
            value={userData.password_confirmation}
            onChange={handleChange}
            required
            id="password_confirmation"
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <p>
        Already have an account?
        <NavLink to="/login">Login</NavLink>
      </p>
    </div>
  );
}

export default Signup;
