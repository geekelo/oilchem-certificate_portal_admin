import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FaPen } from 'react-icons/fa';
import '../../stylesheets/tables.css';

function EachPersonnel({ index, eachPersonnel, handleSelectedPersonnel }) {
  const isChecked = () => {
    handleSelectedPersonnel(eachPersonnel.id);
  };

  return (
    <div>
      <header className="table-header">
        <div className="id">
          <p className="id-text">{index + 1}</p>
        </div>
        <p className="personnel-name">NAME</p>
        <p className="personnel-signature">SIGNATURE</p>
      </header>
      <div className="flex-item">
        <div className="checkbox-cont select">
          <input
            className="checkbox"
            type="checkbox"
            onChange={isChecked}
          />
        </div>
        <p className="personnel-name">{eachPersonnel.name}</p>
        <img className="personnel-signature" src={eachPersonnel.signature} alt="personnel" width="50" />
      </div>
      <NavLink className="personnel-edit-btn" to={`/editpersonnel/${eachPersonnel.id}`}>
        <FaPen />
        &nbsp;Edit
      </NavLink>
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
  index: PropTypes.string.isRequired,
};

export default EachPersonnel;
