import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoutButton from '../../components/LogoutButton';

const Dashboard: React.FC = () => {
  const [username, setUsername] = useState<string>(''); // Nombre de usuario autenticado
  const [profilePicture, setProfilePicture] = useState<string>(''); // Foto de perfil
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
      } catch (error) {
        console.error('Error fetching user data:');
        alert('Failed to load user data');
        navigate('/login'); // Redirige al login si hay un error
      }
    };
  
    fetchUserData();
  }, [navigate]);

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menuButton = document.querySelector('.menu-button');
      const dropdownMenu = document.querySelector('.dropdown-menu');

      if (
        isMenuOpen &&
        menuButton &&
        !menuButton.contains(event.target as Node) &&
        dropdownMenu &&
        !dropdownMenu.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navbarLeft}>
          <span style={styles.logo}>My IA Tools</span>
        </div>
        <div style={styles.navbarRight}>
          <div style={styles.userSection}>
            <img
              src={profilePicture || "/frontend/public/default-avatar.png"}
              alt="Profile"
              style={styles.profilePicture}
              onError={(e) => {
                e.currentTarget.src;
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

// Estilos
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#282c34',
    color: 'white',
  },
  navbarLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  navbarRight: {
    display: 'flex',
    alignItems: 'center',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
  },
  profilePicture: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '1rem',
  },
  username: {
    marginRight: '1rem',
  },
  menuButton: {
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '60px',
    right: '1rem',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '0.5rem',
    zIndex: 1000,
  },
  dropdownItem: {
    display: 'block',
    paddingInline: '0.5rem',
    margin: '10px 0',
    color: '#007BFF',
    textDecoration: 'none',
  },
  content: {
    flex: 1,
    padding: '1rem',
    textAlign: 'center',
  },
};

export default Dashboard;