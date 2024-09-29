import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './root.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';
import Dashboard from './components/Dashboard.jsx';
import PrivateRoute from './Auth/AuthRoute.jsx'; // Import the PrivateRoute component
import Profile from './components/Profile.jsx';
import { AuthProvider } from './context/AuthContext';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path='profile' element={<PrivateRoute element={<Profile />} />} /> {/* Protect Profile */}
      <Route path="dashboard" element={<PrivateRoute element={<Dashboard />} />} /> {/* Protect Dashboard */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
