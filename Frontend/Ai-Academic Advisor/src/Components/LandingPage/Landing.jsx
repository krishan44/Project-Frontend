import React, { useState } from 'react';
import Header from "./Header";
import Home from "./Home";
import About from "./About";
import Services from "./Services";
import Review from "./Review";
import Footer from "./Footer";
import Steps from "./Steps";
import AuthDialog from '../LoginRegistration/Auth';

function Landing() {
  const [showAuth, setShowAuth] = useState(false);

  const handleOpenAuth = () => {
    setShowAuth(true);
  };

  const handleCloseAuth = () => {
    setShowAuth(false);
  };

  return (
    <>
      <Header openAuthDialog={handleOpenAuth} />
      <Home/>
      <About/>
      <Steps/>
      <Services/>
      <Review/>
      <Footer/>
      <AuthDialog 
        key={showAuth ? 'open' : 'closed'} 
        onClose={handleCloseAuth} 
      />
    </>
  );
}

export default Landing;
