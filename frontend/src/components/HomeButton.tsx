// components/HomeButton.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const HomeButton: React.FC = () => {
  return (
    <Link to="/" className='home-button'>
      🏠
    </Link>
  );
};

export default HomeButton;