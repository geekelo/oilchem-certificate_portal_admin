import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Navbar from './components/navbar';
import Certificates from './components/certificates';
import Students from './components/students';
import Home from './components/home';
import Personnel from './components/personnel';
import './App.css';
import Topbar from './components/topbar';
import Login from './auth/login';

function App() {
  return (
    <div>
      <Router>
        <Topbar />
        <div className="body">
          <Navbar />
          <div className="pageSection">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/students" element={<Students />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/personnel" element={<Personnel />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
