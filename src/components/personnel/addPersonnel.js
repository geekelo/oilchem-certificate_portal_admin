import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPersonnel } from '../../redux/personnelSlice';
import '../../stylesheets/forms.css';

function AddPersonnel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const [personnelData, setPersonnelData] = useState({
    name: '',
    signature: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addPersonnel({
      personnelData,
      token,
    }));
    navigate('/personnel');
  };

  const handleChange = (e) => {
    setPersonnelData((personnelData) => ({
      ...personnelData,
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
            type="name"
            name="name"
            placeholder="Input personnel name"
            value={personnelData.name}
            onChange={handleChange}
            required
            id="name"
          />
        </label>
        <label htmlFor="signature">
          Signature url:
          <input
            className="form-input"
            type="signature"
            name="signature"
            placeholder="Input signature url only"
            value={personnelData.signature}
            onChange={handleChange}
            required
            id="signature"
          />
        </label>
        <button className="submitbtn" type="submit">SUBMIT</button>
      </form>
      <div className="form-title-sect">
        <p className="form-title">
          Add
          <br />
          Pers-
          <br />
          onnel
        </p>
      </div>
    </div>
  );
}

export default AddPersonnel;
