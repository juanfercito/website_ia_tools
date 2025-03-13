// pages/user/ProfileSettings.tsx
import React, { useState, useEffect } from 'react';
import '../styles/userSettingsViews.css';
import imageCompression from 'browser-image-compression';

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
    profileImg: '/default-avatar.png', // Imagen predeterminada
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
          profileImg: data.user.profilePicture || '/default-avatar.png',
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
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Opciones de compresión
        const options = {
          maxSizeMB: 1, // Tamaño máximo de 1 MB
          maxWidthOrHeight: 1024, // Redimensionar a un máximo de 1024x1024 píxeles
          useWebWorker: true, // Usar un worker para mejorar el rendimiento
        };

        // Comprimir la imagen
        const compressedBlob = await imageCompression(file, options);

        // Convertir el Blob comprimido en un objeto File
        const compressedFile = new File(
          [compressedBlob],
          file.name, // Mantener el nombre original del archivo
          { type: file.type } // Mantener el tipo MIME original
        );

        // Actualizar el estado con el archivo comprimido
        setEditableData({ ...editableData, profileImg: compressedFile });
        console.log("Imagen comprimida asignada:", compressedFile); // Depuración
      } catch (error) {
        console.error("Error compressing image:", error);
        alert("Failed to compress image");
      }
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
        profileImg: updatedData.user.profilePicture || '/default-avatar.png', // Actualizar la URL de la imagen
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
        <img
          src={
            typeof editableData.profileImg === 'string'
              ? `${editableData.profileImg}?v=${Date.now()}` // Añadir parámetro de consulta para evitar caché
              : userData.profileImg.startsWith('http')
              ? `${userData.profileImg}?v=${Date.now()}`
              : URL.createObjectURL(editableData.profileImg)
          }
          alt="Profile"
          className='profileImage'
          onError={(e) => {
            e.currentTarget.src = '/default-avatar.png'; // Fallback seguro
          }}
        />
        <p>Profile Image</p>
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginTop: '10px' }}
          />
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