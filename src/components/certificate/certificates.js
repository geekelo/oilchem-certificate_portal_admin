import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { displayCertificates } from '../../redux/certificateSlice';
import EachCertificate from './eachCertificate';

function Certificates() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const certificates = useSelector((state) => state.display_certificates.value);
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
    dispatch(displayCertificates(token));
  }, [token]);

  if (certificates.length > 0) {
    return (
      <div>
        <div>
          <NavLink>Add </NavLink>
          <NavLink>Delete</NavLink>
        </div>
        <div>
          {
            [...certificates]
              .sort((a, b) => b.id - a.id)
              .map((each) => <EachCertificate key={each.id} eachCertificate={each} />)
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

export default Certificates;
