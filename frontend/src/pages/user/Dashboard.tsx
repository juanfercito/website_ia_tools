import React, { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import LogoutButton from '../../components/LogoutButton';
import styles from '../styles/userMainPanel';
import ProfileImage from '../../components/ProfileImage';

const DEFAULT_AVATAR = '/default-avatar.webp';

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
        
        // Usar la URL directa del backend
        const userProfilePic = userData.user.profilePicture || DEFAULT_AVATAR;
        setProfilePicture(userProfilePic);

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

      {/* Main Content */}
      <div style={styles.content}>
        <h1>Welcome to your Dashboard</h1>
        <p>This is where you can interact with the app.</p>
      </div>
    </div>
  );
};

export default Dashboard;
