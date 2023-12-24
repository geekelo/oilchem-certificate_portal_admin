import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { displayCertificates } from '../../redux/certificateSlice';
import EachCertificate from './eachCertificate';
import { displayPersonnel } from '../../redux/personnelSlice';
import { displayStudents } from '../../redux/studentSlice';

function Certificates() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const certificateData = useSelector((state) => state.display_certificates.value);
  const personnels = useSelector((state) => state.display_personnel.value);
  const students = useSelector((state) => state.display_students.value);

  const [token, setToken] = useState('');

  useEffect(() => {
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

    checkAuthentication();
  }, [navigate]);

  useEffect(() => {
    const fetchdata = async () => {
      await dispatch(displayStudents(token));
      await dispatch(displayPersonnel(token))
        .then(() => {
          // Dispatch displayCertificates after displayPersonnel is fulfilled
          dispatch(displayCertificates(token));
        })
        .catch((error) => {
          throw error;
        });
    };

    fetchdata();
  }, [dispatch, token]);

  const handleDelete = () => {
    console.log('hi');
  };

  if (certificateData.length > 0) {
    return (
      <div>
        <div>
          {/* <button type="submit" onClick={handleDelete}>Delete</button> */}
        </div>
        <header>
          <p>ID</p>
          <p>Name</p>
          <p>Signature</p>
        </header>
        <div>
          {
            [...certificateData]
              .sort((a, b) => b.id - a.id)
              .map((each) => (
                <EachCertificate
                  key={each.id}
                  eachCertificate={each}
                  students={students}
                  personnels={personnels}
                />
              ))
          }
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <button type="submit" onClick={handleDelete}>Delete</button>
      </div>
      <p>No data available. Loading...</p>
    </div>
  );
}

export default Certificates;
