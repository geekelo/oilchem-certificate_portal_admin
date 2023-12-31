import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { displayCertificates, editCertificate } from '../../redux/certificateSlice';
import { displayPersonnel } from '../../redux/personnelSlice';
import '../../stylesheets/forms.css';

function EditCertificate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split('/').pop();
  const certificates = useSelector((state) => state.display_certificates.value);
  const certificatetarget = certificates.filter((each) => each.id === Number(id));
  const certificate = certificatetarget[0];
  console.log(certificate);
  const personnel = useSelector((state) => state.display_personnel.value);
  const [token, setToken] = useState('');

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

  const [certificateData, setCertificateData] = useState({});

  // HANDLE GO BACK
  const goBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(editCertificate({
      certificateId: id,
      certificateData,
      token,
    }));
    navigate('/certificates');
  };

  const handleChange = (e) => {
    setCertificateData((certificateData) => ({
      ...certificateData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const fetchdata = async () => {
      await dispatch(displayPersonnel(token));
      await dispatch(displayCertificates(token));
      console.log(certificates);
    };
    fetchdata();
    if (certificates.length > 0 && certificate) {
      const certificatetarget = certificates.filter((each) => each.id === Number(id));
      const certificate = certificatetarget[0];
      console.log(certificate);
      setCertificateData({
        name: certificate.name,
        title: certificate.title,
        course: certificate.course,
        purpose: certificate.purpose,
        student_id: certificate.student_id,
        start_date: certificate.start_date,
        end_date: certificate.end_date,
        training_director_id: certificate.training_director_id,
        training_instructor_id: certificate.training_instructor_id,
        external_facilitator_id: certificate.external_facilitator_id,
      });
    }
  }, [navigate, token, dispatch, !certificate]);

  if (certificates.length === 0) {
    return (<p>Load now</p>);
  }

  if (certificates.length > 0 && certificate) {
    console.log(certificate);
    console.log(certificates);
    const trainingdirector = personnel
      .filter((each) => each.id === certificate.training_director_id);
    const traininginstructor = personnel
      .filter((each) => each.id === certificate.training_instructor_id);
    const externalfacilitator = personnel
      .filter((each) => each.id === certificate.external_facilitator_id);

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
              <option value={trainingdirector[0].id}>{trainingdirector[0].name}</option>
              {
                personnel.map((each) => <option key={each.id} value={each.id}>{each.name}</option>)
              }
            </select>
          </label>

          <label htmlFor="training_instructor_id">
            Training instructor:
            <select id="training_instructor_id" name="training_instructor_id" onChange={handleChange}>
              <option value={traininginstructor[0].id}>{traininginstructor[0].name}</option>
              {
                personnel.map((each) => <option key={each.id} value={each.id}>{each.name}</option>)
              }
            </select>
          </label>

          <label htmlFor="training_instructor_id">
            External facilitator:
            <select id="external_facilitator_id" name="external_facilitator_id" onChange={handleChange}>
              <option value={externalfacilitator[0].id}>{externalfacilitator[0].name}</option>
              {
                personnel.map((each) => <option key={each.id} value={each.id}>{each.name}</option>)
              }
            </select>
          </label>

          <button className="submitbtn" type="submit">UPDATE</button>
        </form>
        <div className="form-title-sect">
          <p className="form-title">
            Edit
            <br />
            Certi-
            <br />
            ficate
          </p>
          <p className="form-title">
            Edit
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
  return (<p>loading ...</p>);
}

export default EditCertificate;
