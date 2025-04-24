import React, { Suspense } from 'react';
import ProfileImage from './ProfileImage';
import '../pages/styles/UserMainPanel.css';

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
    <div className="mainLayout">
      <nav className="mainNavbar">
        <div className="navbarLeft">
          <span className="logo">My IA Tools</span>
        </div>
        <div className="navbarRight">
          <div className="userSection">
            <ProfileImage
              src={profilePicture}
              containerSize="small"
              alt="Profile"
              className="nav-profile-image"
            />
            <span className="username">{username}</span>
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