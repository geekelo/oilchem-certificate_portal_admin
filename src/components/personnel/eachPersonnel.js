import React from 'react';
import PropTypes from 'prop-types';

function EachPersonnel({ eachPersonnel }) {
  return (
    <div>
      <header>
        <p>ID</p>
        <p>Name</p>
        <p>Signature</p>
      </header>
      <div>
        <p>{eachPersonnel.id}</p>
        <p>{eachPersonnel.name}</p>
        <img src={eachPersonnel.signature} alt="personnel" width="50" />
      </div>
    </div>
  );
}

EachPersonnel.propTypes = {
  eachPersonnel: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    signature: PropTypes.string.isRequired, // Make it optional if needed
  }).isRequired,
};

export default EachPersonnel;
