// pages/auth/ForgotPassword.tsx
import React, { useState } from 'react';
import HomeButton from '../../components/HomeButton';
import '../styles/authViews.css';

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState(1); // Paso actual del proceso
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Paso 1: Enviar código de verificación al correo electrónico
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    try {
      const response = await fetch('http://localhost:3000/auth/send-verification-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send verification code');
      }
  
      setSuccess('Verification code sent to your email.');
      setStep(2); // Avanzar al siguiente paso
    } catch (error) {
      let errorMessage = 'An error occurred while sending the verification code.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setError(errorMessage);
    }
  };

  // Paso 2: Verificar el código enviado
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:3000/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, verificationCode }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid verification code');
      }

      setSuccess('Code verified successfully.');
      setStep(3); // Avanzar al siguiente paso
    } catch (error) {
      let errorMessage = 'An error occurred while sending the verification code.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setError(errorMessage);
    }
  };

  // Paso 3: Cambiar la contraseña
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:3000/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to change password');
      }

      setSuccess('Password changed successfully.');
      setStep(1); // Reiniciar el proceso
    } catch (error) {
      let errorMessage = 'An error occurred while sending the verification code.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setError(errorMessage);
    }
  };

  return (
    <div className='container'>
      {/* Componente HomeButton */}
      <HomeButton />

      <h1>Forgot Password</h1>

      {step === 1 && (
        <form onSubmit={handleSendCode} className='form'>
          <p>Enter your email to reset your password.</p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='input'
          />
          <button type="submit" className='button'>
            Send Verification Code
          </button>
          {error && <p className='error'>{error}</p>}
          {success && <p className='success'>{success}</p>}
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyCode} className='form'>
          <p>Enter the verification code sent to your email.</p>
          <input
            type="text"
            placeholder="Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
            className='input'
          />
          <button type="submit" className='button'>
            Verify Code
          </button>
          {error && <p className='error'>{error}</p>}
          {success && <p className='success'>{success}</p>}
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleChangePassword} className='form'>
          <p>Enter your new password.</p>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className='input'
          />
          <button type="submit" className='button'>
            Change Password
          </button>
          {error && <p className='error'>{error}</p>}
          {success && <p className='success'>{success}</p>}
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;