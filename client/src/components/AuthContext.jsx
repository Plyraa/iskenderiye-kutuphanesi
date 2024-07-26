import React from 'react';
import axios from "axios";

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (mail, password) => {
    try {
      const url = 'http://localhost:5000/api/login'
      
      const response = await axios.post(url, {
        email: mail,
        password: password,
      })

      if (response.data.success) {
        setIsAuthenticated(true)
        setUser({
          email: response.data.user.email,
          name: response.data.user.name,
          id: response.data.user.id,
        })

        return true;
      } else {
        setIsAuthenticated(false)
        setUser(null)

        return false;
      }
    } catch (error) {
      console.error('Login error:', error)
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }


  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
