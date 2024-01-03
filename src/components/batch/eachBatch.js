import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FaEye, FaPen } from 'react-icons/fa';

function EachBatch({ index, eachBatch, handleSelectedBatches }) {
  const isChecked = () => {
    handleSelectedBatches(eachBatch.id);
  };

  return (
    <div className="each-batch-sect">
      <div className="each-batch-cont">
        <div className="batch-select-cont">
          <input
            type="checkbox"
            onChange={isChecked}
          />
          <NavLink
            className="batch-edit"
            to={`/editbatch/${eachBatch.id}`}
          >
            <FaPen />
            &nbsp;Edit
          </NavLink>
        </div>
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
      </div>
      <NavLink className="edit-btn view-btn" to={`/students/${eachBatch.id}`}>
        <FaEye />
        &nbsp;View Students
      </NavLink>
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
  index: PropTypes.number.isRequired,
};

export default EachBatch;
