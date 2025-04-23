import React, { Suspense } from 'react';
import ProfileImage from './ProfileImage';
import styles from '../pages/styles/userMainPanel';

interface UserLayoutProps {
  username: string;
  profilePicture: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}

const UserBurguerMenu = React.lazy(() => import('./UserBurguerMenu'));

const UserLayout: React.FC<UserLayoutProps> = ({
  username,
  profilePicture,
  isMenuOpen,
  setIsMenuOpen,
  children
}) => {
  return (
    <div style={styles}>
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
      {children}
    </div>
  );
};

export default UserLayout; 