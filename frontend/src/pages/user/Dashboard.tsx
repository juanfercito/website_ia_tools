import React, { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import LogoutButton from '../../components/LogoutButton';
import styles from '../styles/userMainPanel';

const DEFAULT_AVATAR = '/assets/default-avatar.webp'; // Asegúrate de que este archivo exista en `public/assets/`

const UserBurguerMenu = React.lazy(() => import('../../components/UserBurguerMenu'));

const Dashboard: React.FC = () => {
  const [username, setUsername] = useState<string>(''); 
  const [profilePicture, setProfilePicture] = useState<string>(DEFAULT_AVATAR);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

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

        const userData = await response.json();
        if (!userData.user || !userData.user.username) {
          throw new Error('Incomplete user data received from server');
        }

        setUsername(userData.user.username);
        
        // Usar la URL directa del backend sin modificarla
        const userProfilePic = userData.user.profilePicture || DEFAULT_AVATAR;
        setProfilePicture(userProfilePic); // URL ya viene completa desde el backend

        console.log("Profile picture URL:", userProfilePic);

        const darkModePreference = userData.user.darkMode || false;
        document.body.classList.toggle('dark-mode', darkModePreference);
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
          <img
            src={`${profilePicture}?v=${Date.now()}`}
            alt="Profile"
            style={styles.profilePicture}
            onError={(e) => {
              if (!e.currentTarget.src.endsWith(DEFAULT_AVATAR)) {
                e.currentTarget.src = DEFAULT_AVATAR;
              }
            }}
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

      {/* Main Content */}
      <div style={styles.content}>
        <h1>Welcome to your Dashboard</h1>
        <p>This is where you can interact with the app.</p>
      </div>
    </div>
  );
};

export default Dashboard;
