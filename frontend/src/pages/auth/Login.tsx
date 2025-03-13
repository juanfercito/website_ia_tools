// pages/auth/Login.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import HomeButton from '../../components/HomeButton';
import '../styles/authViews.css';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  interface UserResponse {
    id: string;
    name: string;
    email: string;
    username: string;
    role: string;
    profilePicture: string;
    darkMode: boolean;
  }
  
  interface LoginResponse {
    status: string;
    message: string;
    redirect: string;
    token: string;
    user: UserResponse;
  }
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid credentials');
      }

      const data: LoginResponse = await response.json();
      console.log('Login successful:', data);

      // Suponiendo que data.user.darkMode está presente
      if (data.user.darkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }

      alert('Login successful!');
      navigate(data.redirect); // Redirigir según la respuesta del backend
    } catch (error) {
      let errorMessage = 'An error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error('Login failed:', errorMessage);
      alert(errorMessage);
    }
  };

  return (
    <div className='container'>
      {/* Componente HomeButton */}
      <HomeButton />

      <h1>Login</h1>
      <form onSubmit={handleSubmit} className='form'>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className='input'
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className='input'
        />
        <button type="submit" className='button'>
          Login
        </button>
      </form>

      <div className='section'>
        <p>Are not registered yet?</p>
        <Link to="/register" className='link'>
          Register
        </Link>
      </div>

      <div className='section'>
        <p>Forgot password?</p>
        <Link to="/forgot-password" className='link'>
          Recover Password
        </Link>
      </div>
    </div>
  );
};

export default Login;