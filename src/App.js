import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Navbar from './components/navbar';
import Certificates from './components/certificate/certificates';
import Students from './components/student/students';
import Home from './components/home';
import Personnel from './components/personnel/personnel';
import './App.css';
import Topbar from './components/topbar';
import Login from './auth/login';
import Signup from './auth/signup';
import AddPersonnel from './components/personnel/addPersonnel';
import AddStudent from './components/student/addStudent';
import AddCertificate from './components/certificate/addCertificate';

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
              <Route path="/signup" element={<Signup />} />
              <Route path="/addpersonnel" element={<AddPersonnel />} />
              <Route path="/addstudent" element={<AddStudent />} />
              <Route path="/addcertificate/:id" element={<AddCertificate />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
