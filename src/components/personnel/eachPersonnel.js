import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function EachPersonnel({ eachPersonnel, handleSelectedPersonnel }) {
  const isChecked = () => {
    handleSelectedPersonnel(eachPersonnel.id);
  };

  return (
    <div>
      <div>
        <input
          type="checkbox"
          onChange={isChecked}
        />
        <p>{eachPersonnel.id}</p>
        <p>{eachPersonnel.name}</p>
        <img src={eachPersonnel.signature} alt="personnel" width="50" />
      </div>
      <NavLink to={`/editpersonnel/${eachPersonnel.id}`}>Edit</NavLink>
    </div>
  );
}

EachPersonnel.propTypes = {
  eachPersonnel: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    signature: PropTypes.string.isRequired, // Make it optional if needed
  }).isRequired,
  handleSelectedPersonnel: PropTypes.func.isRequired,
};

export default EachPersonnel;
