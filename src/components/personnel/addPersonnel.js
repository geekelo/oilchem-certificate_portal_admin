import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPersonnel } from '../../redux/personnelSlice';

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
  };

  const handleChange = (e) => {
    setPersonnelData((personnelData) => ({
      ...personnelData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <p>
        Add Personnel
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            className="form-input"
            type="name"
            name="name"
            placeholder="joe@mail.com"
            value={personnelData.name}
            onChange={handleChange}
            required
            id="name"
          />
        </label>
        <label htmlFor="signature">
          signature:
          <input
            className="form-input"
            type="signature"
            name="signature"
            placeholder="signature"
            value={personnelData.signature}
            onChange={handleChange}
            required
            id="signature"
          />
        </label>
        <button type="submit">Add Personnel</button>
      </form>
    </div>
  );
}

export default AddPersonnel;
