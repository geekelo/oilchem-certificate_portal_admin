import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPersonnel } from '../../redux/personnelSlice';

function AddPersonnel() {
  const dispatch = useDispatch();
  const [personnelData, setPersonnelData] = useState({
    name: '',
    signature: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedData = localStorage.getItem('oilchemAdmin');
    const parsedData = JSON.parse(storedData);
    await dispatch(addPersonnel({
      personnelData,
      token: parsedData.extractedUserData.token,
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
