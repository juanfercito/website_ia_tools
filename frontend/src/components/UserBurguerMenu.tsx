// components/UserBurguerMenu.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import '../pages/styles/UserMainPanel.css';

interface UserBurguerMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const UserBurguerMenu: React.FC<UserBurguerMenuProps> = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {
  return (
    <>
      {/* Botón del menú */}
      <button
        className="menuButton"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>

      {/* Menú desplegable */}
      {isMenuOpen && (
        <div className='dropdownMenu'>
          <Link to="/profile-settings" className='dropdownItem'>
            Profile
          </Link>
          <Link to="/account-settings" className='dropdownItem'>
            Settings
          </Link>
          <LogoutButton />
        </div>
      )}
    </>
  );
};

export default UserBurguerMenu;