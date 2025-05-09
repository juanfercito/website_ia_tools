import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

// styles
import './App.css';

// components

// Lazy load pages
const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const ForgotPassword = React.lazy(() => import('./pages/auth/ForgotPassword'));
const Dashboard = React.lazy(() => import('./pages/user/Dashboard'));
const AdminPanel = React.lazy(() => import('./pages/user/AdminPanel'));
const ProfileSettings = React.lazy(() => import('./pages/user/ProfileSettings'));
const AccountSettings = React.lazy(() => import('./pages/user/AccountSettings'));


const App: React.FC = () => {


  return (
    <>
      <Suspense fallback={<div className='loading'>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/account-settings" element={<AccountSettings />} />
      </Routes>
      </Suspense>
    </>
  );
};

export default App;