import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaTrash, FaPlus, FaArrowLeft } from 'react-icons/fa';
import { deleteStudent, displayStudents } from '../../redux/studentSlice';
import EachStudent from './eachStudent';
import { displayCertificates } from '../../redux/certificateSlice';
import '../../stylesheets/tables.css';
import Spinner from '../../loaders/spinner';

function Student() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const students = useSelector((state) => state.display_students.value);
  const certificates = useSelector((state) => state.display_certificates.value);
  const [token, setToken] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const location = useLocation();
  const batchId = location.pathname.split('/').pop();

  // VERIFY AUTHENTICITY
  const checkAuthentication = () => {
    const storedData = localStorage.getItem('oilchemAdmin');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (new Date().getTime() > parsedData.expirationTime) {
        localStorage.removeItem('oilchemAdmin');
        navigate('/login');
      } else {
        const tokenData = parsedData.extractedUserData.token;
        setToken(tokenData);
      }
    } else {
      navigate('/login');
    }
  };

  // HANDLE GO BACK
  const goBack = () => {
    navigate(-1);
  };

  // HANDLE DELETE
  const handleDelete = async (e) => {
    e.preventDefault();
    await Promise.all(
      selectedStudents.map((each) => dispatch(deleteStudent({ id: each, token }))),
    );

    await dispatch(displayStudents(token));
  };

  useEffect(() => {
    checkAuthentication();
    dispatch(displayStudents(token));
    dispatch(displayCertificates(token));
  }, [token]);

  const handleSelectedStudents = (param) => {
    if (selectedStudents.includes(param)) {
      setSelectedStudents((selectedStudents) => {
        const updatedStudents = selectedStudents.filter((student) => student !== param);
        return updatedStudents;
      });
    } else {
      setSelectedStudents([...selectedStudents, param]);
    }
  };

  const batchStudents = students.filter((each) => each.id === Number(batchId));
  const screenedCertificates = certificates.map((each) => each.student_id);
  if (batchStudents.length > 0) {
    return (
      <div className="table-cont">
        <div className="topbar">
          <p className="title">Students</p>
          <div className="title-btn">
            <button className="deleteBtn" type="submit" onClick={handleDelete}>
              <FaTrash />
              <span> &nbsp; Bulk Delete</span>
            </button>
          </div>
        </div>
        <div className="flex-container">
          <EachStudent
            key={batchId}
            index={1}
            eachStudent={batchStudents[0]}
            handleSelectedStudents={handleSelectedStudents}
            certificates={screenedCertificates}
          />
        </div>
        <button className="goback" type="submit" onClick={goBack}>
          <FaArrowLeft className="gobackicon" />
          <p>&nbsp; Back</p>
        </button>
      </div>
    );
  }

  return (
    <div className="table-cont">
      <div className="topbar">
        <p className="title">Students</p>
        <div className="title-btn">
          <NavLink className="deleteBtn" to={`/addstudent/${batchId}`}>
            <FaPlus />
            <span> &nbsp; Add new</span>
          </NavLink>
        </div>
      </div>
      <div className="flex-container">
        <Spinner />
      </div>
    </div>
  );
}

export default Student;
