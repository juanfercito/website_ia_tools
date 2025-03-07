import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const cookies = document.cookie.split('; ').find((cookie) => cookie.startsWith('jwt='));
    if (!cookies) {
      alert('You need to log in first');
      navigate('/login');
    }
  }, [navigate]);
};

export default useAuth;