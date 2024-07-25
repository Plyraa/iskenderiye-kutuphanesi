import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuth } from 'components/AuthContext';
import Button from './Button';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Button text={"Çıkış Yap"} clickAction={handleLogout}/>
  );
};

export default LogoutButton;
