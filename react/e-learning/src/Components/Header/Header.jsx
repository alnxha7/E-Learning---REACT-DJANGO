import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
    <nav className="navbar">
      <div className="navbar-left">
        <span className="brand-name">E-Learning</span>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="#features-section">About</a></li>
        <li><a href="#courses-section">Courses</a></li>
        <li><a href="#footer-section">Contact</a></li>
      </ul>
      <div className="navbar-auth">
        <Link to="/register" className="btn register">Register</Link>
        <Link to="/login" className="btn login">Login</Link>
      </div>
    </nav>
    </>
  )
}

export default Header