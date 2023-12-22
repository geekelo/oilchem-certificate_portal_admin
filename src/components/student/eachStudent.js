import React from 'react';
import PropTypes from 'prop-types';

function EachStudent({ eachStudent }) {
  console.log(eachStudent);
  return (
    <div>
      <header>
        <p>ID</p>
        <p>Name</p>
        <p>Cert. No</p>
      </header>
      <div>
        <p>{eachStudent.id}</p>
        <p>{eachStudent.name}</p>
        <p>{eachStudent.unique_number}</p>
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
};

export default EachStudent;
