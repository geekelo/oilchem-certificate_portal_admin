import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const handleSignout = (e) => {
    e.preventDefault();
    localStorage.removeItem('oilchemAdmin');
    window.location.reload();
  };

  return (
    <div className="navSection">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/personnel">Personnel</NavLink>
      <NavLink to="/students">Students</NavLink>
      <NavLink to="/certificates">Certificates</NavLink>
      <button type="submit" onClick={handleSignout}>Sign out</button>
    </div>
  );
}

export default Navbar;
