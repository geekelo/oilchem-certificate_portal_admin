import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaFilter } from 'react-icons/fa';
import { deleteCertificate, displayCertificates } from '../../redux/certificateSlice';
import EachCertificate from './eachCertificate';
import { displayPersonnel } from '../../redux/personnelSlice';
import { displayStudents } from '../../redux/studentSlice';
import '../../stylesheets/tables.css';
import Spinner from '../../loaders/spinner';
import { displayBatches } from '../../redux/batchSlice';

function Certificates() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const certificateData = useSelector((state) => state.display_certificates.value);
  const personnels = useSelector((state) => state.display_personnel.value);
  const students = useSelector((state) => state.display_students.value);
  const batches = useSelector((state) => state.display_batches.value) || [];
  const [selectedCertificates, setSelectedCertificates] = useState([]);
  const [token, setToken] = useState('');
  const [itemsToShow, setItemsToShow] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedCertificates, setDisplayedCertificates] = useState([]);

  // VERIFY AUTHENTICATION
  useEffect(() => {
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

    checkAuthentication();
  }, [navigate]);

  // FETCH DATA
  useEffect(() => {
    const fetchdata = async () => {
      await dispatch(displayStudents(token));
      await dispatch(displayBatches(token));
      await dispatch(displayPersonnel(token))
        .then(() => {
          // Dispatch displayCertificates after displayPersonnel is fulfilled
          dispatch(displayCertificates(token));
        })
        .catch((error) => {
          throw error;
        });
    };
    fetchdata();
  }, [dispatch, token]);

  // HANDLE BULK DELETE
  const handleDelete = async (e) => {
    e.preventDefault();
    await Promise.all(
      selectedCertificates.map((each) => dispatch(deleteCertificate({ id: each, token }))),
    );
    await dispatch(displayCertificates(token));
  };

  const handleSelectedCertificates = (param) => {
    if (selectedCertificates.includes(param)) {
      setSelectedCertificates((selectedCertificates) => {
        const updatedSelectedCertificates = selectedCertificates.filter((each) => each !== param);
        return updatedSelectedCertificates;
      });
    } else {
      setSelectedCertificates([...selectedCertificates, param]);
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

  // HANDLE SEARCH
  const handleSearch = () => {
    // Filter certificate data based on student name or unique number
    const filteredCertificates = certificateData.filter((certificate) => {
      const student = students.find((s) => s.id === certificate.student_id);
      const studentName = student ? student.name.toLowerCase() : '';
      const studentUniqueNumber = student ? student.unique_number.toLowerCase() : '';
      const searchTermLowerCase = searchTerm.toLowerCase();

      return (
        studentName.includes(searchTermLowerCase)
        || studentUniqueNumber.includes(searchTermLowerCase)
      );
    });

    // Update displayed certificates and reset pagination
    setItemsToShow(12);
    setDisplayedCertificates(filteredCertificates);
  };

  // CERTIFICATE SORTER
  useEffect(() => {
    if (certificateData.length > 0) {
      const sortedCertificateData = [...certificateData].sort((a, b) => b.id - a.id);
      setDisplayedCertificates(sortedCertificateData);
    }
  }, [certificateData]);

  if (displayCertificates.length > 0) {
    displayedCertificates.slice(0, itemsToShow);
    return (
      <div className="table-cont">
        <p className="title">Certificates</p>
        <br />
        <br />
        <div className="topbar">
          <div className="search-container">
            <input
              className="search-bar"
              type="text"
              placeholder="Filter by student name or unique number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="searchbtn" type="submit" onClick={handleSearch}>
              <FaFilter />
              <span>&nbsp;Filter</span>
            </button>
          </div>
          <div className="title-btn">
            <button className="deleteBtn" type="submit" onClick={handleDelete}>
              <FaTrash />
              <span> &nbsp; Bulk Delete</span>
            </button>
          </div>
        </div>
        <div className="flex-container">
          {
            [...displayedCertificates]
              .map((each, index) => (
                <EachCertificate
                  key={each.id}
                  eachCertificate={each}
                  students={students}
                  personnels={personnels}
                  index={index}
                  batches={batches}
                  handleSelectedCertificates={handleSelectedCertificates}
                />
              ))
          }
        </div>
        <div className="load-more-container">
          {itemsToShow < certificateData.length && (
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
        <p className="title">Certificates</p>
      </div>
      <div className="flex-container">
        <Spinner />
      </div>
    </div>
  );
}

export default Certificates;
