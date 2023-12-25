import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { displayBatches, deleteBatch } from '../redux/batchSlice';
import EachBatch from './batch/eachBatch';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const batches = useSelector((state) => state.display_batches.value) || [];
  const [token, setToken] = useState('');
  const [selectedBatches, setSelectedBatches] = useState([]);

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

  return (
    <div>
      <p>Home</p>
      <hr />
      <div>
        <NavLink to="/addbatch">Add </NavLink>
        <button type="submit" onClick={handleDelete}>Delete</button>
      </div>
      <form>
        {
          [...batches]
            .sort((a, b) => b.id - a.id)
            .map((each) => (
              <EachBatch
                key={each.id}
                eachBatch={each}
                handleSelectedBatches={handleSelectedBatches}
              />
            ))
        }
      </form>
    </div>
  );
}

export default Home;
