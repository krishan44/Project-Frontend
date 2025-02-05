import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthDialog from './Components/LoginRegistration/Auth';
import Landing from "./Components/LandingPage/Landing"
import Registration from "./Components/LoginRegistration/Registration"
import Dashboard from './Components/User/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Landing" element={<AuthDialog />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
