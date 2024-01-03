import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function EachBatch({ index, eachBatch, handleSelectedBatches }) {
  const isChecked = () => {
    handleSelectedBatches(eachBatch.id);
  };

  return (
    <div className="each-batch-sect">
      <div className="each-batch-cont">
        <input
          type="checkbox"
          onChange={isChecked}
        />
        <p className="batch-name">
          Batch &nbsp;
          {index + 1}
        </p>
        <p className="batch-date">{eachBatch.name}</p>
        <div className="batch-date">
          <p>{eachBatch.start_date}</p>
          <p>-</p>
          <p>{eachBatch.end_date}</p>
        </div>
        <NavLink
          to={`/editbatch/${eachBatch.id}`}
        >
          Edit
        </NavLink>
      </div>
      <NavLink className="edit-btn view-btn" to={`/students/${eachBatch.id}`}>View </NavLink>
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
  index: PropTypes.string.isRequired,
};

export default EachBatch;
