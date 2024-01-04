import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FaPen } from 'react-icons/fa';
import '../../stylesheets/tables.css';

function EachCertificate({
  eachCertificate,
  students,
  personnels,
  handleSelectedCertificates,
  index,
}) {
  const currStudent = students.filter((each) => each.id === eachCertificate.student_id);
  const director = personnels.filter((each) => each.id === eachCertificate.training_director_id);
  const instructor = personnels.filter((e) => e.id === eachCertificate.training_instructor_id);
  const facilitator = personnels.filter((e) => e.id === eachCertificate.external_facilitator_id);
  const studentName = currStudent[0].name || '';
  const studentNumber = currStudent[0].unique_number || '';

  const isChecked = () => {
    handleSelectedCertificates(eachCertificate.id);
  };

  const formatDate = (inputDate) => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];

    const [year, month, day] = inputDate.split('-');
    const monthAbbreviation = months[parseInt(month, 10) - 1];

    return `${parseInt(day, 10)} ${monthAbbreviation}, ${year}`;
  };

  return (
    <div>
      <header className="table-header">
        <div className="id">
          <p className="id-text">{index + 1}</p>
        </div>
        <p className="name">NAME</p>
        <p className="cert-title">TITLE</p>
        <p className="course">COURSE</p>
        <p className="purpose">PURPOSE</p>
        <p className="student">STUDENT</p>
        <p className="duration">DURATION</p>
        <p className="personnel">PERSONNEL</p>
      </header>
      <div className="flex-item">
        <div className="checkbox-cont select">
          <input
            className="checkbox"
            type="checkbox"
            onChange={isChecked}
          />
        </div>
        <p className="name">{eachCertificate.name}</p>
        <p className="cert-title">{eachCertificate.title}</p>
        <p className="course">{eachCertificate.course}</p>
        <p className="purpose">{eachCertificate.purpose}</p>
        <div className="student">
          <div>
            <p><b>Student Number:</b></p>
            {studentName}
          </div>
          <div>
            <p><b>Certificate Number:</b></p>
            {studentNumber}
          </div>
        </div>
        <div className="duration">
          <div>
            <p><b>Start date:</b></p>
            {formatDate(eachCertificate.start_date)}
          </div>
          <div>
            <p><b>End date:</b></p>
            {formatDate(eachCertificate.end_date)}
          </div>
        </div>
        <div className="personnel">
          <div>
            <p><b>Training Director:</b></p>
            {director[0].name || ''}
          </div>
          <div>
            <p><b>Training Instructor:</b></p>
            {instructor[0].name || ''}
          </div>
          <div>
            <p><b>Training Facilitator:</b></p>
            {facilitator[0].name || ''}
          </div>
        </div>
      </div>
      <NavLink
        className="edit-btn"
        to={`/editcertificate/${eachCertificate.id}`}
      >
        <FaPen />
        &nbsp;Edit
      </NavLink>
    </div>
  );
}

EachCertificate.propTypes = {
  handleSelectedCertificates: PropTypes.func.isRequired,
  eachCertificate: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    course: PropTypes.string.isRequired,
    purpose: PropTypes.string.isRequired,
    student_id: PropTypes.number.isRequired,
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string.isRequired,
    training_director_id: PropTypes.number.isRequired,
    training_instructor_id: PropTypes.number.isRequired,
    external_facilitator_id: PropTypes.number.isRequired,
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
  index: PropTypes.number.isRequired,
};

export default EachCertificate;
