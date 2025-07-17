import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './Login.css';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });


  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const getCookie = (name) => {
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith(name + '='))
    ?.split('=')[1];
  return cookieValue || '';
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch('http://localhost:8000/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken')
      },
      credentials: 'include',
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('username', formData.username)
      localStorage.setItem('email', data.email)
      navigate('/dashboard'); 
      setFormData({ username: '', password: '' });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: data.detail || 'Invalid username or password',
        confirmButtonColor: '#007bff'
      });
    }
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: `Server Error ${err}`,
      text: 'Could not connect to the server.',
      confirmButtonColor: '#007bff'
    });
  }
  };

  return (
    <div className="login-container">
    <h2 className="login-heading">Login</h2>
      <div className="login-card">
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
