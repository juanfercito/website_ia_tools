// pages/user/AccountSettings.tsx
import React, { useState, useEffect } from 'react';
import '../styles/userSettingsViews.css';

const AccountSettings: React.FC = () => {
  // Estado para el modo oscuro
  const [userData, setUserData] = useState({
    darkMode: false, // Estado inicial del modo oscuro
  });

  // Estado para controlar si los datos se están cargando
  const [isLoading, setIsLoading] = useState(true);

  // Cargar los datos del usuario desde el backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("Fetching user data...");
        const response = await fetch('http://localhost:3000/auth/me', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        console.log('User data received:', data);

        // Actualizar el estado con los datos del usuario
        setUserData({
          darkMode: data.user.darkMode || false, // Asegúrate de que el campo darkMode esté presente
        });

        // Aplicar la clase CSS al body según el modo oscuro
        document.body.classList.toggle('dark-mode', data.user.darkMode || false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Failed to load user data');
      } finally {
        setIsLoading(false); // Marcar como cargado
      }
    };

    fetchUserData();
  }, []);

  // Manejar el cambio de modo oscuro
  const toggleDarkMode = async () => {
    const newDarkMode = !userData.darkMode;

    try {
      console.log("Updating dark mode preference to:", newDarkMode);
      // Enviar la nueva preferencia al backend
      const response = await fetch('http://localhost:3000/user/update-dark-mode', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ darkMode: newDarkMode }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update dark mode preference');
      }

      // Actualizar el estado local y aplicar la clase CSS al body
      setUserData({ ...userData, darkMode: newDarkMode });
      document.body.classList.toggle('dark-mode', newDarkMode);
      console.log("Dark mode updated successfully to:", newDarkMode);
    } catch (error) {
      console.error('Error updating dark mode:', error);
      alert('Failed to update dark mode preference');
    }
  };

  // Manejar el cambio de contraseña
  const handleChangePassword = async () => {
    try {
      console.log("Changing password...");
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
        <button onClick={handleChangePassword} className="actionButton" disabled={isLoading}>
          Change Password
        </button>
      </div>

      {/* Opción: Modo oscuro */}
      <div className="settingRow">
        <label>Dark Mode:</label>
        <label className="switch">
          <input
            type="checkbox"
            checked={userData.darkMode}
            onChange={toggleDarkMode}
            disabled={isLoading}
          />
          <span className="slider"></span>
        </label>
      </div>

      {/* Opción: Notificaciones */}
      <div className="settingRow">
        <label>Enable Notifications:</label>
        <label className="switch">
          <input type="checkbox" disabled />
          <span className="slider"></span>
        </label>
      </div>

      {/* Opción: Eliminar cuenta */}
      <div className="settingRow">
        <label>Delete Account:</label>
        <button className="deleteButton" disabled>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;