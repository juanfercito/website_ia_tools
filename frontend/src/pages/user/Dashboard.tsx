import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoutButton from '../../components/LogoutButton';
import '../styles/userMainPanel';
import styles from '../styles/userMainPanel';

const Dashboard: React.FC = () => {
  const [username, setUsername] = useState<string>(''); // Nombre de usuario autenticado
  const [profilePicture, setProfilePicture] = useState<string>('/default-avatar.png'); // Foto de perfil
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // Estado del menú desplegable
  const navigate = useNavigate();

  // Función para obtener los datos del usuario desde el backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/me', {
          method: 'GET',
          credentials: 'include', // Incluir cookies en la solicitud
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch user data');
        }

        const userData = await response.json();
        setUsername(userData.user.username || 'User'); // Fallback si no hay username
        setProfilePicture(userData.user.profilePicture || '/default-avatar.png'); // Fallback si no hay foto
        console.log("Profile picture URL:", userData.user.profilePicture); // Depuración
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Failed to load user data');
        navigate('/login'); // Redirige al login si hay un error
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
            <img
              src={profilePicture || '/default-avatar.png'} // Usar la imagen predeterminada si profilePicture está vacío
              alt="Profile"
              style={styles.profilePicture}
              onError={(e) => {
                e.currentTarget.src = '/default-avatar.png'; // Reemplazar con la imagen predeterminada en caso de error
              }}
            />
            <span style={styles.username}>{username}</span>
            <button
              className="menu-button"
              style={styles.menuButton}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
          </div>
          {isMenuOpen && (
            <div className="dropdown-menu" style={styles.dropdownMenu}>
              <Link to="/profile-settings" style={styles.dropdownItem}>
                Profile
              </Link>
              <Link to="/account-settings" style={styles.dropdownItem}>
                Settings
              </Link>
              <LogoutButton />
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div style={styles.content}>
        <h1>Welcome to your Dashboard</h1>
        <p>This is where you can interact with the app.</p>
      </div>
    </div>
  );
};

export default Dashboard;