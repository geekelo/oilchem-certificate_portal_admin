import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { deleteCertificate, displayCertificates } from '../../redux/certificateSlice';
import EachCertificate from './eachCertificate';
import { displayPersonnel } from '../../redux/personnelSlice';
import { displayStudents } from '../../redux/studentSlice';
import '../../stylesheets/tables.css';

function Certificates() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const certificateData = useSelector((state) => state.display_certificates.value);
  const personnels = useSelector((state) => state.display_personnel.value);
  const students = useSelector((state) => state.display_students.value);
  const [selectedCertificates, setSelectedCertificates] = useState([]);
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

  if (certificateData.length > 0) {
    return (
      <div className="table-cont">
        <div className="topbar">
          <p className="title">Certificates</p>
          <div className="title-btn">
            <button className="deleteBtn" type="submit" onClick={handleDelete}>
              <FaTrash />
              <span> &nbsp; Bulk Delete</span>
            </button>
          </div>
        </div>
        <div className="flex-container">
          {
            [...certificateData]
              .sort((a, b) => b.id - a.id)
              .map((each, index) => (
                <EachCertificate
                  key={each.id}
                  eachCertificate={each}
                  students={students}
                  personnels={personnels}
                  index={certificateData.length - (index + 1)}
                  handleSelectedCertificates={handleSelectedCertificates}
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
