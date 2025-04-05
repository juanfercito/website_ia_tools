// components/UserBurguerMenu.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import styles from '../pages/styles/userMainPanel';

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
        className="menu-button"
        style={styles.menuButton}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>

      {/* Menú desplegable */}
      {isMenuOpen && (
        <div className='dropdown-menu' style={styles.dropdownMenu}>
          <Link to="/profile-settings" style={styles.dropdownItem}>
            Profile
          </Link>
          <Link to="/account-settings" style={styles.dropdownItem}>
            Settings
          </Link>
          <LogoutButton />
        </div>
      )}
    </>
  );
};

export default UserBurguerMenu;