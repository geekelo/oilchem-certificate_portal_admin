import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navSection">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/personnel">Personnel</NavLink>
      <NavLink to="/students">Students</NavLink>
      <NavLink to="/certificates">Certificates</NavLink>
    </div>
  );
}

export default Navbar;
