import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { displayPersonnel, deletePersonnel } from '../../redux/personnelSlice';
import EachPersonnel from './eachPersonnel';
import '../../stylesheets/tables.css';
import Spinner from '../../loaders/spinner';

function Personnel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const personnels = useSelector((state) => state.display_personnel.value);
  const [token, setToken] = useState('');
  const [selectedPersonnel, setSelectedPersonnel] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(12);

  // VERIFY AUTHENTICATION
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

  // HANDLE BULK DELETE
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

  // FETCH DATA
  useEffect(() => {
    checkAuthentication();
    dispatch(displayPersonnel(token));
  }, [token]);

  // HANDLE PAGINATION
  const handleLoadMore = (e) => {
    e.preventDefault();
    setItemsToShow(itemsToShow + 12);
  };

  const handleLoadLess = (e) => {
    e.preventDefault();
    setItemsToShow(Math.max(itemsToShow - 12, 12));
  };

  if (personnels.length > 0) {
    const personnel = [...personnels].sort((a, b) => b.id - a.id);
    const displayedPersonnel = personnel
      .slice(0, itemsToShow);

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
            [...displayedPersonnel]
              .map((each, index) => (
                <EachPersonnel
                  key={each.id}
                  index={index}
                  eachPersonnel={each}
                  handleSelectedPersonnel={handleSelectedPersonnel}
                />
              ))
          }
        </div>
        <div className="load-more-container">
          {itemsToShow < personnel.length && (
            <button type="submit" className="paginate" onClick={handleLoadMore}>
              Load More ▼
            </button>
          )}
          {itemsToShow > 12 && (
            <button type="submit" className="paginate" onClick={handleLoadLess}>
              Load Less ▲
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="table-cont">
      <div className="topbar">
        <p className="title">Personnel</p>
        <div className="title-btn">
          <NavLink className="deleteBtn" to="/addpersonnel">
            <FaPlus />
            <span> &nbsp; Add new</span>
          </NavLink>
        </div>
      </div>
      <div className="flex-container">
        <Spinner />
      </div>
    </div>
  );
}

export default Personnel;
