import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

const Landing = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuth();

  // Show different content based on authentication status
  if (user) {
    return (
      <div className="landing-page">
        <div className="landing-content">
          <h1>Welcome to Link Library</h1>
          <p>Choose an option below</p>
          
          <div className="action-buttons">
            <Link to="/add-resource" className="action-button">
              <div className="action-card">
                <h2>Add New Resource</h2>
                <p>Add a new web resource to your collection</p>
              </div>
            </Link>
            
            <Link to="/resources" className="action-button">
              <div className="action-card">
                <h2>View Available Resources</h2>
                <p>Browse and search your resource collection</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show authentication forms for non-authenticated users
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Link Library</h1>
        <p>Your personal resource management system</p>
        
        <div className="auth-container">
          <div className="auth-tabs">
            <button 
              className={`auth-tab ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button 
              className={`auth-tab ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>
          
          {isLogin ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
};

export default Landing; 