import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBatch } from '../../redux/batchSlice';
import '../../stylesheets/forms.css';

function AddBatch() {
  const dispatch = useDispatch();
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const [batchData, setBatchData] = useState({
    name: '',
    start_date: '',
    end_date: '',
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addBatch({
      batchData,
      token,
    }));
    navigate('/');
  };

  const handleChange = (e) => {
    setBatchData((batchData) => ({
      ...batchData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="form-cont">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="name">
          Batch name:
          <input
            className="form-input"
            type="text"
            name="name"
            placeholder="Add preferred batch name"
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
        <button className="submitbtn" type="submit">SUBMIT</button>
      </form>
      <div className="form-title-sect">
        <p className="form-title">Create New Batch</p>
      </div>
    </div>
  );
}

export default AddBatch;
