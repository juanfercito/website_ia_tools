import React, { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import LogoutButton from '../../components/LogoutButton';
import styles from '../styles/userMainPanel';
import ProfileImage from '../../components/ProfileImage';

const DEFAULT_AVATAR = '/default-avatar.webp';

const UserBurguerMenu = React.lazy(() => import('../../components/UserBurguerMenu'));

const AdminPanel: React.FC = () => {
  const [username, setUsername] = useState<string>(''); // Nombre de usuario autenticado
  const [profilePicture, setProfilePicture] = useState<string>(DEFAULT_AVATAR); // Foto de perfil
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // Estado del menú desplegable
  const navigate = useNavigate();

  // Función para obtener los datos del usuario desde el backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/admin/me', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch user data');
        }

        const userData = await response.json();

        // Verifica que los datos necesarios estén presentes
        if (!userData.user || !userData.user.username) {
          throw new Error('Incomplete user data received from server');
        }

        setUsername(userData.user.username);
        
        // Usar la URL directa del backend
        const userProfilePic = userData.user.profilePicture || DEFAULT_AVATAR;
        setProfilePicture(userProfilePic);

        // Aplicar el modo oscuro
        const darkModePreference = userData.user.darkMode || false;
        document.body.classList.toggle('dark-mode', darkModePreference);
        console.log('Dark mode applied:', darkModePreference);
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert(`Error: ${error}. Please log in again.`);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div style={styles}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navbarLeft}>
          <span style={styles.logo}>My IA Tools</span>
        </div>
        <div style={styles.navbarRight}>
          <div style={styles.userSection}>
            <ProfileImage
              src={profilePicture}
              containerSize="small"
              alt="Profile"
              className="nav-profile-image"
            />
            <span style={styles.username}>{username}</span>
            <Suspense fallback={<div>Loading...</div>}>
              <UserBurguerMenu
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
              />
            </Suspense>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <div style={styles.content}>
        <h1>Welcome to your Administration Panel</h1>
        <p>This is where you can view all the app activity.</p>
      </div>
    </div>
  );
};

export default AdminPanel;