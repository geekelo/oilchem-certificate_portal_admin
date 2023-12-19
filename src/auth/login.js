import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { loginUser } from '../redux/loginSlice';

function Login() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.login_user.status);

  const [userData, setUserdata] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(userData));
  };

  const handleChange = (e) => {
    setUserdata({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  if (status === 'done') {
    return <Navigate to="/home" />;
  }
  return (
    <div>
      <p>
        Login
        {status}
      </p>
      <form onSubmit={handleSubmit}>
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
            placeholder="password"
            value={userData.password}
            onChange={handleChange}
            required
            id="password"
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
