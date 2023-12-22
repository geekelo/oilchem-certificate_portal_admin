import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { displayPersonnel, deletePersonnel } from '../../redux/personnelSlice';
import EachPersonnel from './eachPersonnel';

function Personnel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const personnel = useSelector((state) => state.display_personnel.value);
  const [token, setToken] = useState('');
  const [selectedPersonnel, setSelectedPersonnel] = useState([]);

  const checkAuthentication = () => {
    const storedData = localStorage.getItem('oilchemAdmin');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (new Date().getTime() > parsedData.expirationTime) {
        localStorage.removeItem('oilchemAdmin');
        navigate('/login');
      } else {
        const tokenData = parsedData.extractedUserData.token;
        setToken(tokenData);
      }
    } else {
      navigate('/login');
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await Promise.all(
      selectedPersonnel.map((each) => dispatch(deletePersonnel({ id: each, token }))),
    );

    await dispatch(displayPersonnel(token));
  };

  const handleSelectedPersonnel = (param) => {
    if (selectedPersonnel.includes(param)) {
      setSelectedPersonnel((selectedPersonnel) => {
        const updatedPersonnel = selectedPersonnel.filter((personnel) => personnel !== param);
        return updatedPersonnel;
      });
    } else {
      setSelectedPersonnel([...selectedPersonnel, param]);
    }
  };

  useEffect(() => {
    checkAuthentication();
    dispatch(displayPersonnel(token));
  }, [token]);

  if (personnel.length > 0) {
    return (
      <div>
        <div>
          <NavLink to="/addpersonnel">Add </NavLink>
          <button type="submit" onClick={handleDelete}>Delete</button>
        </div>
        <header>
          <p>ID</p>
          <p>Name</p>
          <p>Signature</p>
        </header>
        <div>
          {
            [...personnel]
              .sort((a, b) => b.id - a.id)
              .map((each) => (
                <EachPersonnel
                  key={each.id}
                  eachPersonnel={each}
                  handleSelectedPersonnel={handleSelectedPersonnel}
                />
              ))
          }
        </div>
      </div>
    );
  }

  return (
    <div>
      <p>Loading...</p>
    </div>
  ); // Return null if Personnel.length <= 0
}

export default Personnel;
