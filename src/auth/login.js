import React from 'react';

function Login() {
  return (
    <div>
      <p>Login</p>
      <form>
        <label htmlFor="password">
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="password"
            value={userInfo.password}
            onChange={handleChange}
            required
            id="password"
          />
        </label>
      </form>
    </div>
  );
}

export default Login;
