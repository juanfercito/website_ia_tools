// pages/user/AccountSettings.tsx
import React, { useState, useEffect } from 'react';
import '../styles/userSettingsViews.css?inline';

const AccountSettings: React.FC = () => {

  // Account Settings Status
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isPasswordSectionOpen, setIsPasswordSectionOpen] = useState(false);
  // Dark Mode Statement
  const [userData, setUserData] = useState({darkMode: false,});
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
        // Update Dark mode with user data
        setUserData({ darkMode: data.user.darkMode || false });
        // Apply class CSS to body for the dark mode
        document.body.classList.toggle('dark-mode', data.user.darkMode || false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Failed to load user data');
      } finally {
        setIsLoading(false); // Target as loaded
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

  // handle the updating of the password
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      alert('Please fill in all fields');
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/user/update-password',
        {
          method: 'PATCH',  
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
          body: JSON.stringify({ currentPassword, newPassword }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        alert('Password updated successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setIsPasswordSectionOpen(false); // hide form after successful
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred');
    } finally {setIsLoading(false)};
  };

  return (
    <div className="container">
      <h1>Account Settings</h1>

      {/* Change Password Section */}
      <div className="settingRow">
        <label htmlFor="change-password-btn">Change Password:</label>
        <button
          id="change-password-btn"
          className="actionButton"
          onClick={() => setIsPasswordSectionOpen(true)}
          disabled={isLoading}
        >
          Change Password
        </button>
      </div>

      {/* Formulario de cambio de contraseña (oculto por defecto) */}
      {isPasswordSectionOpen && (
        <div className="passwordFormContainer">
          <div className="passwordChangeRow">
            <label htmlFor="current-password" className="sr-only">Current Password</label>
            <input
              id="current-password"
              name="current-password"
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="inputField"
              disabled={isLoading}
            />
          </div>
          <div className="passwordChangeRow">
            <label htmlFor="new-password" className="sr-only">New Password</label>
            <input
              id="new-password"
              name="new-password"
              type="password"
              placeholder="New Password (min 8 characters)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="inputField"
              minLength={8}
              disabled={isLoading}
            />
          </div>
          <button
            onClick={handleChangePassword}
            className="saveButton"
            disabled={isLoading || !currentPassword || !newPassword}
          >
            Save New Password
          </button>
        </div>
      )}

      {/* Opción: Modo oscuro */}
      <div className="settingRow">
        <label htmlFor="dark-mode">Dark Mode:</label>
        <label className="switch">
          <input
            id="dark-mode"
            name="dark-mode"
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
        <label htmlFor="notifications">Enable Notifications:</label>
        <label className="switch">
          <input
            id="notifications"
            name="notifications"
            type="checkbox"
            disabled
          />
          <span className="slider"></span>
        </label>
      </div>

      {/* Opción: Eliminar cuenta */}
      <div className="settingRow">
        <label htmlFor="delete-account">Delete Account:</label>
        <button
          id="delete-account"
          className="deleteButton"
          disabled
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;