import React from 'react';
import NavbarElement from './NavbarElement';

import { useNavigate } from 'react-router-dom';
import { useAuth } from 'components/AuthContext';


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
