import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter, 
  RouterProvider,
} from "react-router-dom";

import { AuthProvider } from 'components/AuthContext';
import ProtectedRoute from 'components/ProtectedRoute';
import LoginPage from 'pages/LoginPage.jsx';
import NotFoundPage from 'pages/NotFoundPage.jsx';
import DashboardPage from 'pages/DashboardPage.jsx';

import './index.css';
import SignupPage from './pages/SignupPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <NotFoundPage/>
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage/>
      </ProtectedRoute>
    )
  },
  {
    path: "/register",
    element: <SignupPage/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
