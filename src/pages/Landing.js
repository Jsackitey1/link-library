import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../utils/firebase';
import { signInWithPopup } from 'firebase/auth';

const Landing = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/resources');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Welcome to Link Library</h1>
        <p>Organize and manage your web resources in one place</p>
        <button onClick={handleGoogleSignIn} className="google-sign-in">
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Landing; 