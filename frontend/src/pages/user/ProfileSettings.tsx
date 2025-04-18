// pages/user/ProfileSettings.tsx
import React, { useState, useEffect, lazy, Suspense } from 'react';
import '../styles/userSettingsViews.css';
import ProfileImage from '../../components/ProfileImage';

// Lazy load del componente de carga de imágenes
const ImageUploader = lazy(() => import('../../components/ImageUploader'));

const ProfileSettings: React.FC = () => {
  interface EditableData {
    name: string;
    username: string;
    email: string;
    profileImg: string | File;
  }

  const [userData, setUserData] = useState({
    name: 'N/A',
    username: 'N/A',
    email: 'N/A',
    role: 'N/A',
    profileImg: '/default-avatar.webp', // Imagen predeterminada
  });

  const [editableData, setEditableData] = useState<EditableData>({
    name: '',
    username: '',
    email: '',
    profileImg: '', // Para manejar la nueva imagen de perfil
  });

  // Estado para controlar el modo de edición
  const [isEditing, setIsEditing] = useState(false);

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
        console.log('User data received', data);
        setUserData({
          name: data.user.name || 'N/A',
          username: data.user.username || 'N/A',
          email: data.user.email || 'N/A',
          role: data.user.role || 'N/A',
          profileImg: data.user.profilePicture || '/default-avatar.webp',
        });

        // Inicializar los datos editables
        setEditableData({
          name: data.user.name || '',
          username: data.user.username || '',
          email: data.user.email || '',
          profileImg: data.user.profilePicture || '',
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

  // Manejar la carga de una nueva imagen de perfil
  const handleImageChange = async (file: File) => {
    if (file) {
      setEditableData({ ...editableData, profileImg: file });
    }
  };

  // Guardar los cambios en el backend
  const handleSaveChanges = async () => {
    try {
      // Validar que los campos obligatorios no estén vacíos
      if (!editableData.name || !editableData.username || !editableData.email) {
        alert("Please fill in all required fields.");
        return;
      }

      const formData = new FormData();
      formData.append('name', editableData.name);
      formData.append('username', editableData.username);
      formData.append('email', editableData.email);

      // Agregar la imagen solo si es un archivo válido
      if (editableData.profileImg instanceof File) {
        console.log("Archivo adjunto:", editableData.profileImg); // Depuración
        formData.append('profileImg', editableData.profileImg);
      }

      // Depuración: Mostrar el contenido de FormData
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await fetch('http://localhost:3000/user/update-profile', {
        method: 'PATCH',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user data');
      }

      const updatedData = await response.json();

      // Actualizar el estado con los datos actualizados
      setUserData({
        ...userData,
        name: updatedData.user.name,
        username: updatedData.user.username,
        email: updatedData.user.email,
        profileImg: updatedData.user.profilePicture || '/default-avatar.webp', // Actualizar la URL de la imagen
      });

      setIsEditing(false); // Salir del modo de edición
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div className='container'>
      <h1>Profile Settings</h1>

      {/* Imagen de perfil */}
      <div className='profileSection'>
        <ProfileImage
          src={
            typeof editableData.profileImg === 'string'
              ? editableData.profileImg
              : userData.profileImg.startsWith('http')
              ? userData.profileImg
              : URL.createObjectURL(editableData.profileImg)
          }
          containerSize="large"
          alt="Profile"
          className='profileImage'
        />
        <p>Profile Image</p>
        {isEditing && (
          <Suspense fallback={<div>Loading image uploader...</div>}>
            <ImageUploader onImageSelect={handleImageChange} />
          </Suspense>
        )}
      </div>

      {/* Datos del usuario */}
      <div className='fieldsContainer'>
        <div className='fieldRow'>
          <label>Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editableData.name}
              onChange={handleInputChange}
              className='inputField'
            />
          ) : (
            <span>{userData.name}</span>
          )}
        </div>

        <div className='fieldRow'>
          <label>Username:</label>
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={editableData.username}
              onChange={handleInputChange}
              className='inputField'
            />
          ) : (
            <span>{userData.username}</span>
          )}
        </div>

        <div className='fieldRow'>
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editableData.email}
              onChange={handleInputChange}
              className='inputField'
            />
          ) : (
            <span>{userData.email}</span>
          )}
        </div>

        <div className='fieldRow'>
          <label>Role:</label>
          <span>{userData.role}</span>
        </div>
      </div>

      {/* Botones de acción */}
      <div className='buttonContainer'>
        {isEditing ? (
          <button onClick={handleSaveChanges} className='saveButton'>
            Save Changes
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className='editButton'>
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;