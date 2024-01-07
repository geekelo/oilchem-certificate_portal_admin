import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { displayBatches, deleteBatch } from '../../redux/batchSlice';
import EachBatch from './eachBatch';
import '../../stylesheets/home.css';
import Spinner from '../../loaders/spinner';

function Batch() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const batches = useSelector((state) => state.display_batches.value) || [];
  const [token, setToken] = useState('');
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(12);

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

  const handleDelete = async (e) => {
    e.preventDefault();
    await Promise.all(
      selectedBatches.map((each) => dispatch(deleteBatch({ id: each, token }))),
    );

    await dispatch(displayBatches(token));
  };

  useEffect(() => {
    checkAuthentication();
    dispatch(displayBatches(token));
  }, [token]);

  const handleSelectedBatches = (param) => {
    if (selectedBatches.includes(param)) {
      setSelectedBatches((selectedBatches) => {
        const updatedBatches = selectedBatches.filter((batch) => batch !== param);
        return updatedBatches;
      });
    } else {
      setSelectedBatches([...selectedBatches, param]);
    }
  };

  // HANDLE PAGINATION
  const handleLoadMore = (e) => {
    e.preventDefault();
    setItemsToShow(itemsToShow + 12);
  };

  const handleLoadLess = (e) => {
    e.preventDefault();
    setItemsToShow(Math.max(itemsToShow - 12, 12));
  };

  if (batches.length > 0) {
    const sortedBatches = [...batches].sort((a, b) => b.id - a.id);
    const displayedBatches = sortedBatches
      .slice(0, itemsToShow);

    return (
      <div className="homecont">
        <div className="topbar">
          <p className="title">Batches</p>
          <div className="title-btn">
            <NavLink className="deleteBtn" to="/addbatch">
              <FaPlus />
              <span> &nbsp; New Batch</span>
            </NavLink>
            <button className="deleteBtn" type="submit" onClick={handleDelete}>
              <FaTrash />
              <span> &nbsp; Bulk Delete</span>
            </button>
          </div>
        </div>
        <form className="batch-cont">
          {
            [...displayedBatches]
              .sort((a, b) => b.id - a.id)
              .map((each, index) => (
                <EachBatch
                  key={each.id}
                  index={batches.length - (index + 1)}
                  eachBatch={each}
                  handleSelectedBatches={handleSelectedBatches}
                />
              ))
          }
        </form>
        <div className="load-more-container">
          {itemsToShow < sortedBatches.length && (
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
    <div className="homecont">
      <div className="topbar">
        <p className="title">Batches</p>
        <div className="title-btn">
          <NavLink className="deleteBtn" to="/addbatch">
            <FaPlus />
            <span> &nbsp; New Batch</span>
          </NavLink>
        </div>
      </div>
      <form className="batch-cont">
        <Spinner />
      </form>
    </div>
  );
}

export default Batch;
