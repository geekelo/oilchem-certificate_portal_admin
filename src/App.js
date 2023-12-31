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
import AddBatch from './components/batch/addBatch';
import EditBatch from './components/batch/editBatch';
import EditCertificate from './components/certificate/editCertificate';
import EditPersonnel from './components/personnel/editPersonnel';
import EditStudent from './components/student/editStudent';
import Certificate from './components/certificate/detailsCertificate';
import Student from './components/student/detailsStudent';
import NotFound from './components/notFound';

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
              <Route path="/students/:id" element={<Students />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/personnel" element={<Personnel />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/addpersonnel" element={<AddPersonnel />} />
              <Route path="/addstudent/:id" element={<AddStudent />} />
              <Route path="/addcertificate/:id" element={<AddCertificate />} />
              <Route path="/addbatch" element={<AddBatch />} />
              <Route path="/editbatch/:id" element={<EditBatch />} />
              <Route path="/editcertificate/:id" element={<EditCertificate />} />
              <Route path="/editpersonnel/:id" element={<EditPersonnel />} />
              <Route path="/editstudent/:id" element={<EditStudent />} />
              <Route path="/certificate/:id" element={<Certificate />} />
              <Route path="/student/:id" element={<Student />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
