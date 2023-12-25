import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function EachBatch({ eachBatch, handleSelectedBatches }) {
  const isChecked = () => {
    handleSelectedBatches(eachBatch.id);
  };

  return (
    <div>
      <div>
        <input
          type="checkbox"
          onChange={isChecked}
        />
        <p>{eachBatch.id}</p>
        <p>{eachBatch.name}</p>
        <p>{eachBatch.start_date}</p>
        <p>{eachBatch.end_date}</p>
        <NavLink to={`/batch/${eachBatch.id}`}>View </NavLink>
      </div>
    </div>
  );
}

EachBatch.propTypes = {
  eachBatch: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string.isRequired, // Make it optional if needed
  }).isRequired,
  handleSelectedBatches: PropTypes.func.isRequired,
};

export default EachBatch;
