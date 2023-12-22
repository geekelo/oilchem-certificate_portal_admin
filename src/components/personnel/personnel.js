import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { displayPersonnel } from '../../redux/personnelSlice';
import EachPersonnel from './eachPersonnel';

function Personnel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const personnel = useSelector((state) => state.display_personnel.value);
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
        setToken(tokenData);
      }
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    checkAuthentication();
    dispatch(displayPersonnel(token));
  }, [token]);

  if (personnel.length > 0) {
    return (
      <div>
        <div>
          <NavLink to="/addpersonnel">Add </NavLink>
          <NavLink>Delete</NavLink>
        </div>
        <div>
          {
            [...personnel]
              .sort((a, b) => b.id - a.id)
              .map((each) => <EachPersonnel key={each.id} eachPersonnel={each} />)
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

export default Personnel;
