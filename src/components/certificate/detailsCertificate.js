import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';
import { deleteCertificate, displayCertificates } from '../../redux/certificateSlice';
import EachCertificate from './eachCertificate';
import { displayPersonnel } from '../../redux/personnelSlice';
import { displayStudents } from '../../redux/studentSlice';
import '../../stylesheets/tables.css';
import Spinner from '../../loaders/spinner';
import { displayBatches } from '../../redux/batchSlice';

function Certificate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split('/').pop();
  const certificateData = useSelector((state) => state.display_certificates.value);
  const personnels = useSelector((state) => state.display_personnel.value);
  const students = useSelector((state) => state.display_students.value);
  const batches = useSelector((state) => state.display_batches.value) || [];
  const [selectedCertificates, setSelectedCertificates] = useState([]);
  const [token, setToken] = useState('');

  // VERIFY AUTHENTICATION
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

  // FETCH DATA
  useEffect(() => {
    const fetchdata = async () => {
      await dispatch(displayStudents(token));
      await dispatch(displayBatches(token));
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

  // HANDLE BULK DELETE
  const handleDelete = async (e) => {
    e.preventDefault();
    await Promise.all(
      selectedCertificates.map((each) => dispatch(deleteCertificate({ id: each, token }))),
    );
    await dispatch(displayCertificates(token));
  };

  const handleSelectedCertificates = (param) => {
    if (selectedCertificates.includes(param)) {
      setSelectedCertificates((selectedCertificates) => {
        const updatedSelectedCertificates = selectedCertificates.filter((each) => each !== param);
        return updatedSelectedCertificates;
      });
    } else {
      setSelectedCertificates([...selectedCertificates, param]);
    }
  };

  // HANDLE GO BACK
  const goBack = () => {
    navigate(-1);
  };

  // JSX
  if (certificateData.length > 0) {
    const sortedCertificate = certificateData.filter((c) => c.student_id === Number(id));
    console.log(sortedCertificate);
    return (
      <div className="table-cont">
        <div className="topbar">
          <p className="title">Certificate</p>
          <div className="title-btn">
            <button className="deleteBtn" type="submit" onClick={handleDelete}>
              <FaTrash />
              <span> &nbsp; Bulk Delete</span>
            </button>
          </div>
        </div>
        <div className="flex-container">
          <EachCertificate
            key={id}
            eachCertificate={sortedCertificate[0]}
            students={students}
            personnels={personnels}
            index={1}
            batches={batches}
            handleSelectedCertificates={handleSelectedCertificates}
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
        <p className="title">Certificates</p>
      </div>
      <div className="flex-container">
        <Spinner />
      </div>
    </div>
  );
}

export default Certificate;
