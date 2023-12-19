import React from 'react';
import logo from '../assets/oilchem-logo.png';
import '../stylesheets/topbar.css';

function Topbar() {
  return (
    <div className="topbarSection">
      <img className="logo" src={logo} alt="logo" />
      <p>Topbar</p>
    </div>
  );
}

export default Topbar;
