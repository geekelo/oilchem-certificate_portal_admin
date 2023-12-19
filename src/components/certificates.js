import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Certificates() {
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuthentication = () => {
      const storedData = localStorage.getItem('oilchemAdmin');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (new Date().getTime() > parsedData.expirationTime) {
          localStorage.removeItem('oilchemAdmin');
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };

    checkAuthentication();
  }, [navigate]);

  return (
    <div>
      <p>Certificates</p>
    </div>
  );
}

export default Certificates;
