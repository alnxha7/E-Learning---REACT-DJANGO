import React from 'react';
import './hero.css';
import heroImage from './hero.jpg'; 

const Hero = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Unlock Your Future with <span>E-Learning</span></h1>
          <p>Learn from the best instructors, anytime, anywhere. Start your journey today!</p>
          <a href="#" className="hero-btn">Browse Courses</a>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Learning illustration" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id='features-section'>
        <h2>Why Choose Us?</h2>
        <div className="features">
          <div className="feature-card">
            <i className="fa-solid fa-chalkboard-user"></i>
            <h4>Expert Instructors</h4>
            <p>Learn from industry professionals with real-world experience.</p>
          </div>
          <div className="feature-card">
            <i className="fa-solid fa-infinity"></i>
            <h4>Lifetime Access</h4>
            <p>Access your courses anytime after purchase—forever.</p>
          </div>
          <div className="feature-card">
            <i className="fa-solid fa-certificate"></i>
            <h4>Certification</h4>
            <p>Get certified and boost your professional profile.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Hero;