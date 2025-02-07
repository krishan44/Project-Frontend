import React, { useState, useEffect } from 'react';
import LoginForm from './Login';
import Registration from './Registration';

const AuthDialog = ({ onClose }) => {
  // Change initial states
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegistration, setOpenRegistration] = useState(false);

  // Reset state when dialog is closed
  const handleCloseAll = () => {
    setOpenLogin(false);
    setOpenRegistration(false);
    if (onClose) onClose();
  };

  const handleOpenLoginForm = () => {
    setOpenLogin(true);
    setOpenRegistration(false);
  };

  const handleCloseLoginForm = () => {
    handleCloseAll();
  };

  const handleOpenRegistrationForm = () => {
    setOpenRegistration(true);
    setOpenLogin(false);
  };

  const handleCloseRegistrationForm = () => {
    handleCloseAll();
  };

  // Show login form when dialog is opened
  useEffect(() => {
    if (onClose !== undefined) {
      setOpenLogin(true);
      setOpenRegistration(false);
    }
  }, [onClose]);

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