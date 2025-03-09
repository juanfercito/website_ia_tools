// pages/user/ProfileSettings.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileSettings: React.FC = () => {
  const navigate = useNavigate();

  // Estado para almacenar los datos del usuario
  const [userData, setUserData] = useState({
    name: 'N/A',
    username: 'N/A',
    email: 'N/A',
    role: 'N/A',
    profileImg: '/default-avatar.png', // Imagen predeterminada
  });

  // Estado para controlar el modo de edición
  const [isEditing, setIsEditing] = useState(false);

  // Estado temporal para los campos editables
  const [editableData, setEditableData] = useState({
    name: '',
    username: '',
    email: '',
  });

  // Cargar los datos del usuario desde el backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/me', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData({
          name: data.user.name || 'N/A',
          username: data.user.username || 'N/A',
          email: data.user.email || 'N/A',
          role: data.user.role || 'N/A',
          profileImg: data.user.profilePicture || '/default-avatar.png',
        });

        // Inicializar los datos editables
        setEditableData({
          name: data.user.name || '',
          username: data.user.username || '',
          email: data.user.email || '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Failed to load user data');
      }
    };

    fetchUserData();
  }, []);

  // Manejar cambios en los campos editables
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableData({ ...editableData, [name]: value });
  };

  // Guardar los cambios en el backend
  const handleSaveChanges = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editableData),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      const updatedData = await response.json();
      setUserData({
        ...userData,
        name: updatedData.user.name,
        username: updatedData.user.username,
        email: updatedData.user.email,
      });

      setIsEditing(false); // Salir del modo de edición
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div style={styles.container}>
      <h1>Profile Settings</h1>

      {/* Imagen de perfil */}
      <div style={styles.profileSection}>
        <img src={userData.profileImg} alt="Profile" style={styles.profileImage} />
        <p>Profile Image</p>
      </div>

      {/* Datos del usuario */}
      <div style={styles.fieldsContainer}>
        <div style={styles.fieldRow}>
          <label>Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editableData.name}
              onChange={handleInputChange}
              style={styles.inputField}
            />
          ) : (
            <span>{userData.name}</span>
          )}
        </div>

        <div style={styles.fieldRow}>
          <label>Username:</label>
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={editableData.username}
              onChange={handleInputChange}
              style={styles.inputField}
            />
          ) : (
            <span>{userData.username}</span>
          )}
        </div>

        <div style={styles.fieldRow}>
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editableData.email}
              onChange={handleInputChange}
              style={styles.inputField}
            />
          ) : (
            <span>{userData.email}</span>
          )}
        </div>

        <div style={styles.fieldRow}>
          <label>Role:</label>
          <span>{userData.role}</span>
        </div>
      </div>

      {/* Botones de acción */}
      <div style={styles.buttonContainer}>
        {isEditing ? (
          <button onClick={handleSaveChanges} style={styles.saveButton}>
            Save Changes
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} style={styles.editButton}>
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

// Estilos del componente
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
    padding: '20px',
    maxWidth: '600px',
    margin: 'auto',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  profileSection: {
    marginBottom: '20px',
  },
  profileImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '10px',
  },
  fieldsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '20px',
  },
  fieldRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputField: {
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '200px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  editButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  saveButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ProfileSettings;