import React, { useState } from 'react';
import LoginForm from './Login';
import Registration from './Registration'; // Changed from RegistrationForm to Registration

const AuthDialog = () => {
    // Change initial state for registration to false
    const [openLogin, setOpenLogin] = useState(true);
    const [openRegistration, setOpenRegistration] = useState(false); // Changed from true
  
    const handleOpenLoginForm = () => {
      setOpenLogin(true);
      setOpenRegistration(false);
    };
  
    const handleCloseLoginForm = () => {
      setOpenLogin(false);
    };
  
    const handleOpenRegistrationForm = () => {
      setOpenRegistration(true);
      setOpenLogin(false);
    };
  
    const handleCloseRegistrationForm = () => {
      setOpenRegistration(false);
    };
  
    return (
      <>
        <LoginForm 
          open={openLogin}
          closeForm={handleCloseLoginForm}
          openRegistrationForm={handleOpenRegistrationForm}
        />
        <Registration 
          open={openRegistration}
          closeForm={handleCloseRegistrationForm}
          openLoginForm={handleOpenLoginForm}
        />
      </>
    );
  };

export default AuthDialog;