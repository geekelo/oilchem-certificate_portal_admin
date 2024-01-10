import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FaPen, FaPlus } from 'react-icons/fa';
import '../../stylesheets/tables.css';
import CopyButton from '../copybtn';

function EachStudent({
  index,
  eachStudent,
  handleSelectedStudents,
  certificates,
}) {
  const [certificateExist, setCertificateExist] = useState(false);
  const isChecked = () => {
    handleSelectedStudents(eachStudent.id);
  };

  console.log(certificates);
  console.log(eachStudent.id);
  useEffect(() => {
    if (certificates.includes(eachStudent.id)) {
      setCertificateExist(true);
    } else {
      setCertificateExist(false);
    }
  });

  return (
    <div>
      <header className="table-header">
        <div className="id">
          <p className="id-text">{index + 1}</p>
        </div>
        <p className="student-name">NAME</p>
        <p className="student-number">CERTIFICATE NO:</p>
        <p className="student-action">ACTION</p>
      </header>
      <div className="flex-item">
        <div className="checkbox-cont select student-select">
          <input
            type="checkbox"
            onChange={isChecked}
          />
        </div>
        <p className="student-name">{eachStudent.name}</p>
        <p className="student-number">
          {eachStudent.unique_number}
          &nbsp;
          <CopyButton textToCopy={eachStudent.unique_number} />
        </p>
        { !certificateExist
          ? (
            <NavLink className="student-action deleteBtn" to={`/addcertificate/${eachStudent.id}`}>
              <FaPlus />
              &nbsp; Create Certificate
            </NavLink>
          )
          : (
            <p className="student-action">
              <span className="id-text">✔</span>
              <NavLink className="certificate-created" to={`/certificate/${eachStudent.id}`}>
                &nbsp;Certificate Created
                <sup>➹</sup>
              </NavLink>
            </p>
          )}
      </div>
      <NavLink className="edit-btn" to={`/editstudent/${eachStudent.id}`}>
        <FaPen />
        &nbsp;Edit
      </NavLink>
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
  index: PropTypes.number.isRequired,
};

export default EachStudent;
