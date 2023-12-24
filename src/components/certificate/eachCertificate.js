import React from 'react';
import PropTypes from 'prop-types';

function EachCertificate({
  eachCertificate,
  students,
  personnels,
}) {
  const currStudent = students.filter((each) => each.id === eachCertificate.student_id);
  const director = personnels.filter((each) => each.id === eachCertificate.training_director_id);
  const instructor = personnels.filter((e) => e.id === eachCertificate.training_instructor_id);
  const facilitator = personnels.filter((e) => e.id === eachCertificate.external_facilitator_id);
  const studentName = currStudent[0].name || '';
  const studentNumber = currStudent[0].unique_number || '';

  return (
    <div>
      <div>
        <p>{eachCertificate.id}</p>
        <p>{eachCertificate.name}</p>
        <p>{eachCertificate.title}</p>
        <p>{eachCertificate.course}</p>
        <p>{eachCertificate.purpose}</p>
        <p>{studentName}</p>
        <p>{studentNumber}</p>
        <p>{eachCertificate.start_date}</p>
        <p>{eachCertificate.end_date}</p>
        <p>{director[0].name}</p>
        <p>{director[0].signature}</p>
        <p>{instructor[0].name || ''}</p>
        <p>{instructor[0].signature || ''}</p>
        <p>{facilitator[0].name || ''}</p>
        <p>{facilitator[0].signature || ''}</p>
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
    training_instructor_id: PropTypes.string.isRequired,
    external_facilitator_id: PropTypes.string.isRequired,
  }).isRequired,
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      // Add more properties if needed
    }),
  ).isRequired,
  personnels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      // Add more properties if needed
    }),
  ).isRequired,
};

export default EachCertificate;
