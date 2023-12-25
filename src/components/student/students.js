import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { deleteStudent, displayStudents } from '../../redux/studentSlice';
import EachStudent from './eachStudent';

function Students() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const students = useSelector((state) => state.display_students.value);
  const [token, setToken] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const location = useLocation();
  const batchId = location.pathname.split('/').pop();

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

  const batchStudents = students.filter((each) => each.batch_id === Number(batchId));
  if (batchStudents.length > 0) {
    return (
      <div>
        <div>
          <NavLink to={`/addstudent/${batchId}`}>Add </NavLink>
          <button type="submit" onClick={handleDelete}>Delete</button>
        </div>
        <div>
          <p>ID</p>
          <p>Name</p>
          <p>Cert. No</p>
        </div>
        <form>
          {
            [...batchStudents]
              .sort((a, b) => b.id - a.id)
              .map((each) => (
                <EachStudent
                  key={each.id}
                  eachStudent={each}
                  handleSelectedStudents={handleSelectedStudents}
                />
              ))
          }
        </form>
      </div>
    );
  }

  return (
    <div>
      <div>
        <NavLink to={`/addstudent/${batchId}`}>Add </NavLink>
        <button type="submit" onClick={handleDelete}>Delete</button>
      </div>
      <p>No student to display yet. Loading...</p>
    </div>
  ); // Return null if students.length <= 0
}

export default Students;
