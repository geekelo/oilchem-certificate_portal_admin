import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { addStudent } from '../../redux/studentSlice';
import '../../stylesheets/forms.css';

function AddStudent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const generatedID = uuidv4();
  const truncatedId = generatedID.substring(0, 6);
  const studentId = `oms${truncatedId}`;
  const location = useLocation();
  const batchId = location.pathname.split('/').pop();
  const [token, setToken] = useState('');

  const [studentData, setstudentData] = useState({
    name: '',
    unique_number: studentId,
    batch_id: batchId,
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
    await dispatch(addStudent({
      studentData,
      token,
    }));
    navigate(-1);
  };

  const handleChange = (e) => {
    setstudentData((studentData) => ({
      ...studentData,
      [e.target.name]: e.target.value,
    }));
  };

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
            value={studentData.name}
            onChange={handleChange}
            required
            id="name"
          />
        </label>
        <button className="submitbtn" type="submit">SUBMIT</button>
      </form>
      <div className="form-title-sect">
        <p className="form-title">
          Add
          <br />
          Stu-
          <br />
          dent
        </p>
      </div>
    </div>
  );
}

export default AddStudent;
