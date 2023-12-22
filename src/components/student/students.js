import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { displayStudents } from '../../redux/studentSlice';
import EachStudent from './eachStudent';

function Students() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const students = useSelector((state) => state.display_students.value);
  const [token, setToken] = useState('');

  const checkAuthentication = () => {
    const storedData = localStorage.getItem('oilchemAdmin');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (new Date().getTime() > parsedData.expirationTime) {
        localStorage.removeItem('oilchemAdmin');
        navigate('/login');
      } else {
        const tokenData = parsedData.extractedUserData.token;
        console.log(tokenData);
        setToken(tokenData);
        console.log(tokenData); // Corrected console.log
      }
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    checkAuthentication();
    dispatch(displayStudents(token));
  }, [token]);

  if (students.length > 0) {
    console.log(students);
    return (
      <div>
        <div>
          <NavLink to="/addstudent">Add </NavLink>
          <NavLink>Delete</NavLink>
        </div>
        <div>
          {
            [...students]
              .sort((a, b) => b.id - a.id)
              .map((each) => <EachStudent key={each.id} eachStudent={each} />)
          }
        </div>
      </div>
    );
  }

  return (
    <div>
      <p>Loading...</p>
    </div>
  ); // Return null if students.length <= 0
}

export default Students;
