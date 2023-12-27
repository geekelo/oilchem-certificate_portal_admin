import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function EachStudent({ eachStudent, handleSelectedStudents, certificates }) {
  const isChecked = () => {
    handleSelectedStudents(eachStudent.id);
  };

  console.log(certificates);
  return (
    <div>
      <div>
        <input
          type="checkbox"
          onChange={isChecked}
        />
        <p>{eachStudent.id}</p>
        <p>{eachStudent.name}</p>
        <p>{eachStudent.unique_number}</p>
        { certificates.includes(eachStudent.id)
          ? (<NavLink to={`/addcertificate/${eachStudent.id}`}>Add </NavLink>)
          : (<p>Added</p>)}
        <NavLink to={`/editstudent/${eachStudent.id}`}>Edit</NavLink>
      </div>
    </div>
  );
}

EachStudent.propTypes = {
  eachStudent: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    unique_number: PropTypes.string.isRequired, // Make it optional if needed
  }).isRequired,
  handleSelectedStudents: PropTypes.func.isRequired,
  certificates: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default EachStudent;
