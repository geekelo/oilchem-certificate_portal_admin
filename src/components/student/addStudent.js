import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { addStudent } from '../../redux/studentSlice';

function AddStudent() {
  const dispatch = useDispatch();
  const studentID = uuidv4();
  const truncatedId = studentID.substring(0, 11);
  const location = useLocation();
  const batchId = location.pathname.split('/').pop();

  const [studentData, setstudentData] = useState({
    name: '',
    unique_number: truncatedId,
    batch_id: batchId,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedData = localStorage.getItem('oilchemAdmin');
    const parsedData = JSON.parse(storedData);
    await dispatch(addStudent({
      studentData,
      token: parsedData.extractedUserData.token,
    }));
  };

  const handleChange = (e) => {
    setstudentData((studentData) => ({
      ...studentData,
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
            value={studentData.name}
            onChange={handleChange}
            required
            id="name"
          />
        </label>
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}

export default AddStudent;
