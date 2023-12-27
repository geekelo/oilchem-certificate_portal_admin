import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { displayPersonnel, editPersonnel } from '../../redux/personnelSlice';

function EditPersonnel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const personnels = useSelector((state) => state.display_personnel.value);
  const personneltarget = personnels.filter((each) => each.id === Number(id));
  const personnel = personneltarget[0];
  const [token, setToken] = useState('');
  const [personnelData, setPersonnelData] = useState({});

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
    dispatch(displayPersonnel(token));
    if (personnels.length > 0) {
      setPersonnelData({
        name: personnel.name,
        signature: personnel.signature,
      });
    }
  }, [token, !personnel]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(editPersonnel({
      personnelId: id,
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

  if (personnel) {
    return (
      <div>
        <p>
          Edit Personnel
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
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

export default EditPersonnel;
