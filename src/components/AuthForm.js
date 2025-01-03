import React, { useState } from 'react';
import { signInWithGoogle, signInWithEmail, createUserWithEmail } from '../utils/firebase';
import { FcGoogle } from 'react-icons/fc';
import { HiMail } from 'react-icons/hi';
import './AuthForm.css';

const AuthForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegistering) {
        await createUserWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-header">
          <h1>Link Library</h1>
          <p>Your personal resource manager</p>
        </div>

        <div className="auth-card">
          <h2>{isRegistering ? 'Create your account' : 'Welcome back'}</h2>
          <p className="auth-subtitle">
            {isRegistering 
              ? 'Start organizing your resources today'
              : 'Sign in to access your resources'
            }
          </p>

          <div className="social-auth">
            <button 
              onClick={() => signInWithGoogle()} 
              className="google-button"
              disabled={loading}
            >
              <FcGoogle className="google-icon" />
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="auth-divider">
            <span>or continue with email</span>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <div className="input-wrapper">
                <HiMail className="input-icon" />
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="password-label">
                <label htmlFor="password">Password</label>
                {!isRegistering && (
                  <a href="#" className="forgot-password">
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="input-wrapper">
                <input
                  type="password"
                  id="password"
                  placeholder={isRegistering ? 'Create a password' : 'Enter your password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={loading}
            >
              {loading 
                ? 'Please wait...' 
                : isRegistering 
                  ? 'Create account' 
                  : 'Sign in'
              }
            </button>
          </form>

          <p className="auth-switch">
            {isRegistering 
              ? 'Already have an account? ' 
              : "Don't have an account? "
            }
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="switch-button"
              disabled={loading}
            >
              {isRegistering ? 'Sign in' : 'Create one'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm; 