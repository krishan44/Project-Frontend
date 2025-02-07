import React, { useState } from 'react';
import Header from "./Header";
import Home from "./Home";
import About from "./About";
import Services from "./Services";
import Review from "./Review";
import Footer from "./Footer";
import Steps from "./Steps";
import Resources from './Resources';
import AuthDialog from '../LoginRegistration/Auth';

function Landing() {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  const handleOpenAuthDialog = () => {
    setIsAuthDialogOpen(true);
  };

  const handleCloseAuthDialog = () => {
    setIsAuthDialogOpen(false);
  };

  return (
    <>
      <Header openAuthDialog={handleOpenAuthDialog} />
      <Home openAuthDialog={handleOpenAuthDialog} />
      <About/>
      <Steps/>
      <Services/>
      <Resources/>
      <Review/>
      <Footer/>
      
      <AuthDialog 
        onClose={handleCloseAuthDialog} 
        open={isAuthDialogOpen}
      />
    </>
  );
}

export default Landing;
