import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  username: string;
  profilePicture: string;
  darkMode?: boolean;
}

const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/me', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('You need to log in first');
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  return { user };
};

export default useAuth;