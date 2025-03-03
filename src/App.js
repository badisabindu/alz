import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginComponent from './Components/LoginComponent'
import SignupComponent from './Components/SignupComponent';
import LandingComponent from './Components/LandingComponent';
//import HeaderComponent from './components/HeaderComponent';
import MetricsPage from './Components/MetricsComponent';
import HomePage from './Components/HomePageComponent';
import ProfilePage from './Components/ProfileComponent';
import UploadPage from './Components/UploadComponent';
function App() {
  return (
    <BrowserRouter>
      
        <div className="d-flex flex-column min-vh-100">
          
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<LandingComponent/>} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/signup" element={<SignupComponent/>} />
              <Route path="/home" element={<HomePage/>}/>
              <Route path="/metrics" element={<MetricsPage/>}/>
              <Route path="/profile"element={<ProfilePage/>}/>
              <Route path="/upload" element={<UploadPage/>}/>
              {/* <Route path="/test" element={<TestingComponent />} /> */}
            </Routes>
          </main>
          
        </div>
      
    </BrowserRouter>
  );
}

export default App;