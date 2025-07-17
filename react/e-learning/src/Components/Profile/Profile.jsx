import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './Profile.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({ username: '', email: '' });
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const username = localStorage.getItem('username') || 'User';
  const email = localStorage.getItem('email');
  const navigate = useNavigate();


  useEffect(() => {

    setUser({ username: username, email: email });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSubmit = async (e) => {
        e.preventDefault();

        /* 1. front‑end validation */
        if (passwords.new !== passwords.confirm) {
            Swal.fire({
            icon: 'error',
            title: 'Request Denied',
            text: 'New passwords do not match',
            confirmButtonColor: '#007bff'
            });
            return;
        }

        try {
            /* 2. call the backend */
            const response = await fetch('http://localhost:8000/api/change-password/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: user.username,
                current: passwords.current,
                new: passwords.new          // make sure backend expects "new"
            })
            });

            const data = await response.json();

            if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Password Updated',
                text: data.message,
                confirmButtonColor: '#007bff'
            }).then(() =>{
                localStorage.removeItem('username');
                localStorage.removeItem('email');
                navigate('/login');
            })
            setPasswords({ current: '', new: '', confirm: '' });
            } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.detail || 'Failed to update password',
                confirmButtonColor: '#007bff'
            });
            }
        } catch (error) {
            Swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: `Something went wrong...${error}`,
            confirmButtonColor: '#007bff'
            });
        }
        };

  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>
      <div className="profile-card">
        <div className="profile-info">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>

        <form className="password-form" onSubmit={handleSubmit}>
          <h3>Change Password</h3>

          <input
            type={showPassword ? 'text' : 'password'}
            name="current"
            placeholder="Current Password"
            value={passwords.current}
            onChange={handlePasswordChange}
            required
          />
          <input
            type={showPassword ? 'text' : 'password'}
            name="new"
            placeholder="New Password"
            value={passwords.new}
            onChange={handlePasswordChange}
            required
          />
          <input
            type={showPassword ? 'text' : 'password'}
            name="confirm"
            placeholder="Confirm New Password"
            value={passwords.confirm}
            onChange={handlePasswordChange}
            required
          />

          <label className="toggle-password">
            <input type="checkbox" onChange={() => setShowPassword(!showPassword)} />
            Show Passwords
          </label>

          <button type="submit" className="change-btn">Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
