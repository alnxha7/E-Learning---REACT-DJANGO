import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  // 1️⃣  component‑level state
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // 2️⃣  keep state updated
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // 3️⃣  submit handler (INSIDE the component!)
  const handleSubmit = async (e) => {
    e.preventDefault();

    /* client‑side password match check */
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops…',
        text: 'Passwords do not match!',
        confirmButtonColor: '#007bff'
      });
      return;
    }

    /* send to Django */
    try {
      const { username, email, password, confirmPassword } = formData;
      const res = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          password,
          confirm_password: confirmPassword
        })
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'Your account has been created! You can now Login',
          confirmButtonColor: '#007bff'
        }).then(() => {
          navigate('/login')
        })
        // reset the form
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
      } else {
        /* Django returned validation errors */
        const errorMsg =
          data?.username?.[0] ||
          data?.email?.[0] ||
          data?.password?.[0] ||
          'Registration failed. Please try again.';
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMsg,
          confirmButtonColor: '#007bff'
        });
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Could not connect to the server.',
        confirmButtonColor: '#007bff'
      });
    }
  };

  /* 4️⃣  JSX */
  return (
    <div className="register-container">
      <h2 className="register-heading">Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
