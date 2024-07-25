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
import SignupPage from 'pages/SignupPage.jsx';
import ContentsPage from 'pages/ContentsPage.jsx';
import HistoryPage from 'pages/HistoryPage.jsx';
import WishlistPage from 'pages/WishlistPage.jsx';
import LuckyPage from 'pages/LuckyPage.jsx';


import './index.css';
import SummaryPage from './pages/SummaryPage.jsx';
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
    element: <ProtectedRoute/>,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
        children: [
          {
            index: true,
            element: <SummaryPage/>,
          },
          {
            path: "content",
            element: <ContentsPage />,
          },
          {
            path: "history",
            element: <HistoryPage />,
          },
          {
            path: "wishlist",
            element: <WishlistPage />,
          },
          {
            path: "lucky",
            element: <LuckyPage />,
          }
        ],
      },

    ],
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
