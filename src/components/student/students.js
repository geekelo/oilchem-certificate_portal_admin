import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { deleteStudent, displayStudents } from '../../redux/studentSlice';
import EachStudent from './eachStudent';
import { displayCertificates } from '../../redux/certificateSlice';
import '../../stylesheets/tables.css';
import Spinner from '../../loaders/spinner';

function Students() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const students = useSelector((state) => state.display_students.value);
  const certificates = useSelector((state) => state.display_certificates.value);
  const [token, setToken] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const location = useLocation();
  const batchId = location.pathname.split('/').pop();
  const [itemsToShow, setItemsToShow] = useState(12);

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

  // HANDLE PAGINATION
  const handleLoadMore = (e) => {
    e.preventDefault();
    setItemsToShow(itemsToShow + 12);
  };

  const handleLoadLess = (e) => {
    e.preventDefault();
    setItemsToShow(Math.max(itemsToShow - 12, 12));
  };

  const batchStudents = students.filter((each) => each.batch_id === Number(batchId));
  const screenedCertificates = certificates.map((each) => each.student_id);
  if (batchStudents.length > 0) {
    const sortedBatchStudents = [...batchStudents].sort((a, b) => b.id - a.id);
    const displayedBatchStudents = sortedBatchStudents
      .slice(0, itemsToShow);

    return (
      <div className="table-cont">
        <div className="topbar">
          <p className="title">Students</p>
          <div className="title-btn">
            <NavLink className="deleteBtn" to={`/addstudent/${batchId}`}>
              <FaPlus />
              <span> &nbsp; Add new</span>
            </NavLink>
            <button className="deleteBtn" type="submit" onClick={handleDelete}>
              <FaTrash />
              <span> &nbsp; Bulk Delete</span>
            </button>
          </div>
        </div>
        <div className="flex-container">
          {
            [...displayedBatchStudents]
              .sort((a, b) => b.id - a.id)
              .map((each, index) => (
                <EachStudent
                  key={each.id}
                  index={index}
                  eachStudent={each}
                  handleSelectedStudents={handleSelectedStudents}
                  certificates={screenedCertificates}
                />
              ))
          }
        </div>
        <div className="load-more-container">
          {itemsToShow < sortedBatchStudents.length && (
            <button type="submit" className="paginate" onClick={handleLoadMore}>
              Load More ▼
            </button>
          )}
          {itemsToShow > 12 && (
            <button type="submit" className="paginate" onClick={handleLoadLess}>
              Load Less ▲
            </button>
          )}
        </div>
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

export default Students;
