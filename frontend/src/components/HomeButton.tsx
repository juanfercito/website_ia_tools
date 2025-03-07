// components/HomeButton.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomeButton: React.FC = () => {
  return (
    <Link to="/" style={styles.homeIcon}>
      🏠
    </Link>
  );
};

// Estilos del componente
const styles: { [key: string]: React.CSSProperties } = {
  homeIcon: {
    position: 'fixed', // Fijo en la pantalla
    bottom: '20px', // Distancia desde la parte inferior
    right: '20px', // Distancia desde la derecha
    fontSize: '2rem', // Tamaño del ícono
    color: '#007BFF', // Color del ícono
    textDecoration: 'none', // Sin subrayado
    cursor: 'pointer', // Cambia el cursor al pasar el mouse
    zIndex: 1000, // Asegura que esté por encima de otros elementos
  },
};

export default HomeButton;