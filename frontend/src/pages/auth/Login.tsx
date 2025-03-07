// pages/auth/Login.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import HomeButton from '../../components/HomeButton'; // Importamos el componente

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

  interface LoginResponse {
    status: string;
    message: string;
    redirect: string;
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
    <div style={styles.container}>
      {/* Componente HomeButton */}
      <HomeButton />

      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>

      <div style={styles.section}>
        <p>Are not registered yet?</p>
        <Link to="/register" style={styles.link}>
          Register
        </Link>
      </div>

      <div style={styles.section}>
        <p>Forgot password?</p>
        <Link to="/forgot-password" style={styles.link}>
          Recover Password
        </Link>
      </div>
    </div>
  );
};

// Tipamos explícitamente los estilos como React.CSSProperties
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
    position: 'relative', // Necesario para posicionar el ícono
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '400px',
    margin: 'auto',
  },
  input: {
    padding: '0.5rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '0.5rem',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  section: {
    marginTop: '1rem',
  },
  link: {
    color: '#007BFF',
    textDecoration: 'none',
    marginLeft: '0.5rem',
  },
};

export default Login;