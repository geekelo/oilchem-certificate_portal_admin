import React from 'react';
import rippleloader from '../assets/rippleloader.gif';
import '../stylesheets/spinner.css';

function Spinner() {
  return (
    <div className="loader">
      <img src={rippleloader} alt="loader" />
      <p>No data to load yet!</p>
    </div>
  );
}

export default Spinner;
