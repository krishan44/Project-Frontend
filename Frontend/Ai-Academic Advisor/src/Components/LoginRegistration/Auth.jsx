import React, { useState } from 'react';
import LoginForm from './Login';
import Registration from './Registration';

const AuthDialog = ({ onClose }) => {
  const [openLogin, setOpenLogin] = useState(true);
  const [openRegistration, setOpenRegistration] = useState(false);

  const handleSwitchToRegistration = () => {
    console.log('Switching to registration...');
    setOpenLogin(false);
    setOpenRegistration(true);
  };

  const handleSwitchToLogin = () => {
    setOpenRegistration(false);
    setOpenLogin(true);
  };

  const handleClose = () => {
    setOpenLogin(false);
    setOpenRegistration(false);
    onClose();
  };

  if (!openLogin && !openRegistration) {
    return null;
  }

  console.log('Login form state:', openLogin);
  console.log('Registration form state:', openRegistration);

  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1400,
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }}>
      <LoginForm 
        open={openLogin}
        closeForm={handleClose}
        openRegistrationForm={handleSwitchToRegistration}
      />
      <Registration 
        open={openRegistration}
        closeForm={handleClose}
        openLoginForm={handleSwitchToLogin}
      />
    </div>
  );
};

export default AuthDialog;