import React from 'react';
import HomeButton from '../../components/HomeButton';

const ForgotPassword: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {/* Componente HomeButton */}
      <HomeButton />
      <h1>Forgot Password</h1>
      <p>Enter your email to reset your password.</p>
    </div>
  );
};

export default ForgotPassword;