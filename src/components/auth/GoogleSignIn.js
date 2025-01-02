import React from 'react';
import { auth, googleProvider } from '../../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const GoogleSignIn = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google sign in successful:', result.user);
      navigate('/resources');
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  };

  return (
    <button 
      type="button" 
      className="google-sign-in" 
      onClick={handleGoogleSignIn}
    >
      <img 
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
        alt="Google logo" 
      />
      Continue with Google
    </button>
  );
};

export default GoogleSignIn; 