import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { displayPersonnel, deletePersonnel } from '../../redux/personnelSlice';
import EachPersonnel from './eachPersonnel';
import '../../stylesheets/tables.css';

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
      <div className="table-cont">
        <div className="topbar">
          <p className="title">Personnel</p>
          <div className="title-btn">
            <NavLink className="deleteBtn" to="/addpersonnel">
              <FaPlus />
              <span> &nbsp; Add new</span>
            </NavLink>
            <button className="deleteBtn" type="submit" onClick={handleDelete}>
              <FaTrash />
              <span> &nbsp; Bulk Delete</span>
            </button>
          </div>
        </div>
        <div className="flex-container">
          {
            [...personnel]
              .sort((a, b) => b.id - a.id)
              .map((each, index) => (
                <EachPersonnel
                  key={each.id}
                  index={personnel.length - (index + 1)}
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
