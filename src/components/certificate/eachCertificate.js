import React from 'react';
import PropTypes from 'prop-types';

function EachCertificate({ eachCertificate }) {
  return (
    <div>
      <header>
        <p>ID</p>
        <p>Name</p>
        <p>Signature</p>
      </header>
      <div>
        <p>{eachCertificate.id}</p>
        <p>{eachCertificate.name}</p>
        <p>{eachCertificate.title}</p>
        <p>{eachCertificate.course}</p>
        <p>{eachCertificate.purpose}</p>
        <p>{eachCertificate.student_id}</p>
        <p>{eachCertificate.student_id}</p>
        <p>{eachCertificate.start_date}</p>
        <p>{eachCertificate.end_date}</p>
        <p>{eachCertificate.training_director_id}</p>
        <p>{eachCertificate.training_director_id}</p>
        <p>{eachCertificate.training_director_id}</p>
      </div>
    </div>
  );
}

EachCertificate.propTypes = {
  eachCertificate: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    course: PropTypes.string.isRequired,
    purpose: PropTypes.string.isRequired,
    student_id: PropTypes.string.isRequired,
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string.isRequired,
    training_director_id: PropTypes.string.isRequired,
  }).isRequired,
};

export default EachCertificate;
