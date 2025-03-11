import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import HomeButton from '../../components/HomeButton';
import '../styles/authViews.css';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
  
      const data = await response.json();
      console.log('Registration successful:', data);
      alert('Registration successful!');
      navigate('/login'); // Redirigir al login después del registro
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed');
    }
  };

  return (
    <div className='container'>
      {/* Componente HomeButton */}
      <HomeButton />
      
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className='form'>
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className='input'
        />
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className='input'
        />
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
        <button type="submit" className='button'>Register</button>
      </form>

      <div className='section'>
        <p>Already registered?</p>
        <Link to="/login" className='link'>Login</Link>
      </div>
    </div>
  );
};

export default Register;