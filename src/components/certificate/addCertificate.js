import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { addCertificate } from '../../redux/certificateSlice';
import { displayPersonnel } from '../../redux/personnelSlice';
import '../../stylesheets/forms.css';

function AddCertificate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split('/').pop();
  const personnel = useSelector((state) => state.display_personnel.value);
  const [token, setToken] = useState('');
  const [certificateData, setCertificateData] = useState({
    name: 'Oilchem Mud School',
    title: 'CERTIFICATION OF ACCOMPLISHMENT',
    course: 'BASIC MUD ENGINEERING',
    purpose: 'HAS SATISFACTORILY COMPLETED THE PRESCRIBED API RP 13L TECHNICAL TRAINING COURSES',
    student_id: id,
    start_date: '',
    end_date: '',
    training_director_id: 0,
    training_instructor_id: 0,
    external_facilitator_id: 0,
  });

  // VERIFY AUTHENTICATION
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

  // POST DATA
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

  // UPDATE DATA
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

  // HANDLE GO BACK
  const goBack = () => {
    navigate(-1);
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
            placeholder="joe@mail.com"
            value={certificateData.name}
            onChange={handleChange}
            required
            id="name"
          />
        </label>
        <label htmlFor="title">
          Title:
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
          Course:
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
          Purpose:
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
          Start date:
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
          End date:
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
          Training director:
          <select id="training_director_id" name="training_director_id" onChange={handleChange}>
            <option value="">Select...</option>
            {
              personnel.map((each) => <option key={each.id} value={each.id}>{each.name}</option>)
            }
          </select>
        </label>

        <label htmlFor="training_instructor_id">
          Training instructor:   
          <select id="training_instructor_id" name="training_instructor_id" onChange={handleChange}>
            <option value="">Select...</option>
            {
              personnel.map((each) => <option key={each.id} value={each.id}>{each.name}</option>)
            }
          </select>
        </label>

        <label htmlFor="training_instructor_id">
          External facilitator:
          <select id="external_facilitator_id" name="external_facilitator_id" onChange={handleChange}>
            <option value="">Select...</option>
            {
              personnel.map((each) => <option key={each.id} value={each.id}>{each.name}</option>)
            }
          </select>
        </label>

        <button className="submitbtn" type="submit">DONE</button>
      </form>
      <div className="form-title-sect">
        <p className="form-title">
          Add
          <br />
          New
          <br />
          Certi-
          <br />
          ficate
        </p>
        <p className="form-title">
          Add
          <br />
          New
          <br />
          Certi-
          <br />
          ficate
        </p>
      </div>
      <button className="goback" type="submit" onClick={goBack}>
        <FaArrowLeft className="gobackicon" />
        <p>&nbsp; Back</p>
      </button>
    </div>
  );
}

export default AddCertificate;
