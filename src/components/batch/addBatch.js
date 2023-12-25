import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBatch } from '../../redux/batchSlice';

function AddBatch() {
  const dispatch = useDispatch();

  const [batchData, setBatchData] = useState({
    name: '',
    start_date: '',
    end_date: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedData = localStorage.getItem('oilchemAdmin');
    const parsedData = JSON.parse(storedData);
    await dispatch(addBatch({
      batchData,
      token: parsedData.extractedUserData.token,
    }));
  };

  const handleChange = (e) => {
    setBatchData((batchData) => ({
      ...batchData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <p>
        Add Student
      </p>
      <form onSubmit={handleSubmit}>
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
          start date:
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
          end date:
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
        <button type="submit">Add Batch</button>
      </form>
    </div>
  );
}

export default AddBatch;
