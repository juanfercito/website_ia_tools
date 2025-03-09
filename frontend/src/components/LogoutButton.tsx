import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {

    const navigate = useNavigate();

    const [ isHovered, setIsHovered ] = useState(false);

    const handleLogout = async () => {
        try {
        // Enviar solicitud POST al backend para cerrar sesión
        const response = await fetch('http://localhost:3000/auth/logout', {
            method: 'POST',
            credentials: 'include', // Incluir cookies en la solicitud
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to log out');
        }
    
        // Limpiar el estado local (opcional)
        console.log('Logged out successfully');
        alert('Logged out successfully!');
        navigate('/login'); // Redirigir al login después de cerrar sesión
        } catch (error) {
        console.error('Logout failed:', error);
        alert('Logout failed');
        }
    };

    // Estilos
    const styles: { [key: string]: React.CSSProperties } = {
        logoutItem: {
            display: 'block',
            paddingInline: '0.5rem',
            margin: '10px 0',
            color: '#fcfcfc',
            fontWeight: 'bold',
            borderRadius: '6px',
            backgroundColor: isHovered ? '#343D6A' : 'green',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            },
    };

    return (
        <button onClick={handleLogout}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={styles.logoutItem}>
            Logout
        </button>

    );
};

export default LogoutButton;