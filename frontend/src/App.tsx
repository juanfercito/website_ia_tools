import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import Dashboard from './pages/user/Dashboard';
import AdminPanel from './pages/user/AdminPanel';
import ProfileSettings from './pages/user/ProfileSettings';
import AccountSettings from './pages/user/AccountSettings';


// styles
import './App.css';

// components
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const location = useLocation();

  // Mostrar la Navbar solo en la página de inicio ("/")
  const shouldShowNavbar = location.pathname === '/';

  return (
    <>
      {shouldShowNavbar && <Navbar />}
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
    </>
  );
};

export default App;