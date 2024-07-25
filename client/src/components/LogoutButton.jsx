import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuth } from 'components/AuthContext';
import NavbarElement from './NavbarElement';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <NavbarElement text={"Çıkış Yap"} clickAction={handleLogout}/>
  );
};

export default LogoutButton;
