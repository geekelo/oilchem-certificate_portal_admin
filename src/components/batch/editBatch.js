import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { displayBatches, editBatch } from '../../redux/batchSlice';
import '../../stylesheets/forms.css';

function EditBatch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [token, setToken] = useState('');
  const batches = useSelector((state) => state.display_batches.value);
  const batchtarget = batches.filter((each) => each.id === Number(id));
  const batch = batchtarget[0];
  const [batchData, setBatchData] = useState({});

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
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(displayBatches({
        batchId: id,
        token,
      }));
    };
    fetchData();
    if (batch) {
      setBatchData({
        name: batch.name,
        start_date: batch.start_date,
        end_date: batch.end_date,
      });
    }
  }, [token, !batch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editBatch({
      batchId: id,
      batchData,
      token,
    }));
    navigate('/');
  };

  // HANDLE GO BACK
  const goBack = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    setBatchData((batchData) => ({
      ...batchData,
      [e.target.name]: e.target.value,
    }));
  };
  if (batch) {
    return (
      <div className="form-cont">
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="name">
            Name:
            <input
              className="form-input"
              type="text"
              name="name"
              placeholder="joe"
              value={batchData.name}
              onChange={handleChange}
              required
              id="name"
            />
          </label>
          <label htmlFor="start_date">
            Start date:
            <input
              className="form-input"
              type="date"
              name="start_date"
              placeholder="start_date"
              value={batchData.start_date}
              onChange={handleChange}
              required
              id="start_date"
            />
          </label>
          <label htmlFor="end_date">
            End date:
            <input
              className="form-input"
              type="date"
              name="end_date"
              placeholder="end_date"
              value={batchData.end_date}
              onChange={handleChange}
              required
              id="end_date"
            />
          </label>
          <button className="submitbtn" type="submit">UPDATE</button>
        </form>
        <div className="form-title-sect">
          <p className="form-title">Edit Batch Details</p>
        </div>
        <button className="goback" type="submit" onClick={goBack}>
          <FaArrowLeft className="gobackicon" />
          <p>&nbsp; Back</p>
        </button>
      </div>
    );
  }
}

export default EditBatch;
