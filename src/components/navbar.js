import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AiFillHome, AiOutlineUser } from 'react-icons/ai';
import { GiGraduateCap } from 'react-icons/gi';
import { FaUsers } from 'react-icons/fa';

function Navbar() {
  const location = useLocation();
  const path = location.pathname;
  const [acctStatus, setAcctStatus] = useState('Login');

  const handleSignout = (e) => {
    e.preventDefault();
    localStorage.removeItem('oilchemAdmin');
    window.location.reload();
  };

  useEffect(() => {
    if (path !== '/login') {
      setAcctStatus('Sign out');
    } else {
      setAcctStatus('Login');
    }
  }, [path]);

  return (
    <div className="navSection">
      <NavLink className="menu-item" to="/">
        <AiFillHome className="menu-icon" />
        <span>Home</span>
      </NavLink>
      <NavLink className="menu-item" to="/personnel">
        <FaUsers className="menu-icon" />
        <span>Personnel</span>
      </NavLink>
      <NavLink className="menu-item" to="/certificates">
        <GiGraduateCap className="menu-icon" />
        <span>Certificates</span>
      </NavLink>
      <button className="menu-item" type="submit" onClick={handleSignout}>
        <AiOutlineUser className="menu-icon" />
        {acctStatus}
      </button>
    </div>
  );
}

export default Navbar;
