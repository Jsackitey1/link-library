import React, { useState } from 'react';
import { auth } from '../utils/firebase';
import { FcGoogle } from 'react-icons/fc';
import { HiMail } from 'react-icons/hi';
import './AuthForm.css';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

const AuthForm = ({ mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'signup') {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      setError(error.message);
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
          <h2>{mode === 'signup' ? 'Create your account' : 'Welcome back'}</h2>
          <p className="auth-subtitle">
            {mode === 'signup' 
              ? 'Start organizing your resources today'
              : 'Sign in to access your resources'
            }
          </p>

          <div className="social-auth">
            <button 
              onClick={handleGoogleSignIn} 
              className="google-button"
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
                />
              </div>
            </div>

            <div className="form-group">
              <div className="password-label">
                <label htmlFor="password">Password</label>
                {mode !== 'signup' && (
                  <a href="#" className="forgot-password">
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="input-wrapper">
                <input
                  type="password"
                  id="password"
                  placeholder={mode === 'signup' ? 'Create a password' : 'Enter your password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="submit-button"
            >
              {mode === 'signup' ? 'Create account' : 'Sign in'}
            </button>
          </form>

          <p className="auth-switch">
            {mode === 'signup' 
              ? 'Already have an account? ' 
              : "Don't have an account? "
            }
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="switch-button"
            >
              {mode === 'signup' ? 'Sign in' : 'Create one'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm; 