import React from 'react';
import logo from '../assets/oilchem-logo.png';
import '../stylesheets/topbar.css';

function Topbar() {
  return (
    <div className="topbarSection">
      <img className="logo" src={logo} alt="logo" />
      <h3> &nbsp; OILCHEM MUD SCHOOL CERTIFICATE PORTAL CMS</h3>
    </div>
  );
}

export default Topbar;
