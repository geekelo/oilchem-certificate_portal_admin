import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { displayBatches } from '../redux/batchSlice';
import '../stylesheets/home.css';
import { displayStudents } from '../redux/studentSlice';
import { displayCertificates } from '../redux/certificateSlice';
import { displayPersonnel } from '../redux/personnelSlice';
import Batch from './batch/batch';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const batches = useSelector((state) => state.display_batches.value) || [];
  const students = useSelector((state) => state.display_students.value) || [];
  const certificates = useSelector((state) => state.display_certificates.value) || [];
  const personnel = useSelector((state) => state.display_personnel.value) || [];
  const [token, setToken] = useState('');

  const checkAuthentication = () => {
    const storedData = localStorage.getItem('oilchemAdmin');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (new Date().getTime() > parsedData.expirationTime) {
        localStorage.removeItem('oilchemAdmin');
        navigate('/login');
      } else {
        setToken(parsedData.extractedUserData.token);
      }
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    checkAuthentication();
    dispatch(displayBatches(token));
    dispatch(displayStudents(token));
    dispatch(displayCertificates(token));
    dispatch(displayPersonnel(token));
  }, [token]);

  return (
    <div className="homecont">
      <div className="statistics-cont">
        <div className="total-sub-sect">
          <div className="total-each-sect">
            <p className="statistics-title">Students</p>
            <p className="">
              Total:
              &nbsp;
              {students.length}
            </p>
          </div>
          <div className="total-each-sect">
            <p className="statistics-title">Certificates</p>
            <p className="">
              Total:
              &nbsp;
              {certificates.length}
            </p>
          </div>
        </div>
        <div className="total-sub-sect">
          <div className="total-each-sect">
            <p className="statistics-title">Personnel</p>
            <p className="">
              Total:
              &nbsp;
              {personnel.length}
            </p>
          </div>
          <div className="total-each-sect">
            <p className="statistics-title">Batches</p>
            <p className="">
              Total:
              &nbsp;
              {batches.length}
            </p>
          </div>
        </div>
      </div>
      <hr className="home-divider" />
      <Batch />
    </div>
  );
}

export default Home;
