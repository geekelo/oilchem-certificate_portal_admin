import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addCertificate } from '../../redux/certificateSlice';
import { displayPersonnel } from '../../redux/personnelSlice';

function AddCertificate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split('/').pop();
  const personnel = useSelector((state) => state.display_personnel.value);
  const [token, setToken] = useState('');
  const [certificateData, setCertificateData] = useState({
    name: '',
    title: '',
    course: '',
    purpose: '',
    student_id: id,
    start_date: '',
    end_date: '',
    training_director_id: 0,
    training_instructor_id: 0,
    external_facilitator_id: 0,
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
    const storedData = localStorage.getItem('oilchemAdmin');
    const parsedData = JSON.parse(storedData);
    await dispatch(addCertificate({
      certificateData,
      token: parsedData.extractedUserData.token,
    }));
    navigate(-1);
  };

  const handleChange = (e) => {
    setCertificateData((certificateData) => ({
      ...certificateData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const fetchdata = async () => {
      await dispatch(displayPersonnel({ token }));
    };
    fetchdata();
  }, [token]);

  return (
    <div>
      <p>
        Add Certiicate
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            className="form-input"
            type="text"
            name="name"
            placeholder="joe@mail.com"
            value={certificateData.name}
            onChange={handleChange}
            required
            id="name"
          />
        </label>
        <label htmlFor="title">
          title:
          <input
            className="form-input"
            type="text"
            name="title"
            placeholder="title"
            value={certificateData.title}
            onChange={handleChange}
            required
            id="title"
          />
        </label>
        <label htmlFor="course">
          course:
          <input
            className="form-input"
            type="course"
            name="course"
            placeholder="course"
            value={certificateData.course}
            onChange={handleChange}
            required
            id="course"
          />
        </label>
        <label htmlFor="purpose">
          purpose:
          <input
            className="form-input"
            type="text"
            name="purpose"
            placeholder="purpose"
            value={certificateData.purpose}
            onChange={handleChange}
            required
            id="purpose"
          />
        </label>
        <label htmlFor="start_date">
          start date:
          <input
            className="form-input"
            type="date"
            name="start_date"
            placeholder="start_date"
            value={certificateData.start_date}
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
            value={certificateData.end_date}
            onChange={handleChange}
            required
            id="end_date"
          />
        </label>
        <label htmlFor="training_director_id">
          training director:
          <select id="training_director_id" name="training_director_id" onChange={handleChange}>
            <option value="">Select...</option>
            {
              personnel.map((each) => <option key={each.id} value={each.id}>{each.name}</option>)
            }
          </select>
        </label>

        <label htmlFor="training_instructor_id">
          training instructor:
          <select id="training_instructor_id" name="training_instructor_id" onChange={handleChange}>
            <option value="">Select...</option>
            {
              personnel.map((each) => <option key={each.id} value={each.id}>{each.name}</option>)
            }
          </select>
        </label>

        <label htmlFor="training_instructor_id">
          training instructor:
          <select id="external_facilitator_id" name="external_facilitator_id" onChange={handleChange}>
            <option value="">Select...</option>
            {
              personnel.map((each) => <option key={each.id} value={each.id}>{each.name}</option>)
            }
          </select>
        </label>

        <button type="submit">Add Certificate</button>
      </form>
    </div>
  );
}

export default AddCertificate;
