import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { displayStudents, editStudent } from '../../redux/studentSlice';

function EditStudent() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split('/').pop();
  const students = useSelector((state) => state.display_students.value);
  const studenttarget = students.filter((each) => each.id === Number(id));
  const student = studenttarget[0];
  const [token, setToken] = useState('');
  const [studentData, setstudentData] = useState({});

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
    dispatch(displayStudents(token));
    if (student) {
      setstudentData({
        name: student.name,
        unique_number: student.unique_number,
        batch_id: student.batch_id,
      });
    }
  }, [token, !student]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(editStudent({
      studentId: id,
      studentData,
      token,
    }));
  };

  const handleChange = (e) => {
    setstudentData((studentData) => ({
      ...studentData,
      [e.target.name]: e.target.value,
    }));
  };

  if (student) {
    return (
      <div>
        <p>
          Edit Student
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
}

export default EditStudent;
