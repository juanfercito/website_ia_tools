// pages/user/AccountSettings.tsx
import React, { useState } from 'react';
import '../styles/userSettingsViews.css';

const AccountSettings: React.FC = () => {
  // Estado para el modo oscuro
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Manejar el cambio de modo oscuro
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle('dark-mode', !isDarkMode); // Aplicar clase CSS al body
  };

  // Manejar el cambio de contraseña
  const handleChangePassword = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to change password');
      }

      alert('Password changed successfully!');
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Failed to change password');
    }
  };

  return (
    <div className="container">
      <h1>Account Settings</h1>

      {/* Opción: Cambiar contraseña */}
      <div className="settingRow">
        <label>Change Password:</label>
        <button onClick={handleChangePassword} className="actionButton">
          Change Password
        </button>
      </div>

      {/* Opción: Modo oscuro */}
      <div className="settingRow">
        <label>Dark Mode:</label>
        <label className="switch">
          <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
          <span className="slider"></span>
        </label>
      </div>

      {/* Opción: Notificaciones */}
      <div className="settingRow">
        <label>Enable Notifications:</label>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider"></span>
        </label>
      </div>

      {/* Opción: Eliminar cuenta */}
      <div className="settingRow">
        <label>Delete Account:</label>
        <button className="deleteButton">Delete Account</button>
      </div>
    </div>
  );
};

export default AccountSettings;