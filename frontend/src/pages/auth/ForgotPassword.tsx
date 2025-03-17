// pages/auth/ForgotPassword.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeButton from '../../components/HomeButton';
import '../styles/authViews.css';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:3000/auth/send-verification-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      setSuccess('Verification code sent to your email.');
      setStep(2);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:3000/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, verificationCode }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      setSuccess('Code verified successfully.');
      setStep(3);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:3000/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, verificationCode, newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      setSuccess('Password changed successfully!');
      setTimeout(() => navigate('/login'), 2000); // Redirigir al login
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <div className='container'>
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
          <p>Enter your new password (minimum 8 characters).</p>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            minLength={8}
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