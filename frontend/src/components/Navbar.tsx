import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Estilo para los botones con hover
const StyledButton = styled(Link)`
  padding: 0.5rem 1rem;
  background-color: #fff;
  color: #007bff;
  text-decoration: none;
  border-radius: 6px;
  font-weight: bold;
  transition: all 0.3s ease; // Agrega una transición suave

  &:hover {
    background-color: #0056b3; // Cambia el color de fondo en hover
    color: #ffffff; // Cambia el color del texto en hover
    transform: scale(1.05); // Aumenta ligeramente el tamaño
  }
`;

const Navbar: React.FC = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>IA TOOLS</div>
      <div style={styles.buttons}>
        <StyledButton to="/login">Login</StyledButton>
        <StyledButton to="/register">Register</StyledButton>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#007BFF',
    color: '#fff',
    borderRadius: '6px',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  buttons: {
    display: 'flex',
    gap: '1rem',
  },
};

export default Navbar;