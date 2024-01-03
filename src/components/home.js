import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { displayBatches, deleteBatch } from '../redux/batchSlice';
import EachBatch from './batch/eachBatch';
import '../stylesheets/home.css';
import { displayStudents } from '../redux/studentSlice';
import { displayCertificates } from '../redux/certificateSlice';
import { displayPersonnel } from '../redux/personnelSlice';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const batches = useSelector((state) => state.display_batches.value) || [];
  const students = useSelector((state) => state.display_students.value) || [];
  const certificates = useSelector((state) => state.display_certificates.value) || [];
  const personnel = useSelector((state) => state.display_personnel.value) || [];
  const [token, setToken] = useState('');
  const [selectedBatches, setSelectedBatches] = useState([]);

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

  const handleDelete = async (e) => {
    e.preventDefault();
    await Promise.all(
      selectedBatches.map((each) => dispatch(deleteBatch({ id: each, token }))),
    );

    await dispatch(displayBatches(token));
  };

  useEffect(() => {
    checkAuthentication();
    dispatch(displayBatches(token));
    dispatch(displayStudents(token));
    dispatch(displayCertificates(token));
    dispatch(displayPersonnel(token));
  }, [token]);

  const handleSelectedBatches = (param) => {
    if (selectedBatches.includes(param)) {
      setSelectedBatches((selectedBatches) => {
        const updatedBatches = selectedBatches.filter((batch) => batch !== param);
        return updatedBatches;
      });
    } else {
      setSelectedBatches([...selectedBatches, param]);
    }
  };

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
      <div className="topbar">
        <p className="title">Batches</p>
        <div className="title-btn">
          <NavLink className="deleteBtn" to="/addbatch">
            <FaPlus />
            <span> &nbsp; New Batch</span>
          </NavLink>
          <button className="deleteBtn" type="submit" onClick={handleDelete}>
            <FaTrash />
            <span> &nbsp; Bulk Delete</span>
          </button>
        </div>
      </div>
      <form className="batch-cont">
        {
          [...batches]
            .sort((a, b) => b.id - a.id)
            .map((each, index) => (
              <EachBatch
                key={each.id}
                index={batches.length - (index + 1)}
                eachBatch={each}
                handleSelectedBatches={handleSelectedBatches}
              />
            ))
        }
      </form>
    </div>
  );
}

export default Home;
