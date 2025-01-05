import { auth, db } from '../utils/firebase';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useState } from 'react';
import { getRandomEmoji } from '../utils/emojiUtils';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const createUserProfile = async (user) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          email: user.email,
          avatar: getRandomEmoji(),
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        });
        console.log('User profile created with random emoji avatar');
      } else {
        await setDoc(userRef, {
          lastLogin: new Date().toISOString()
        }, { merge: true });
      }
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      let userCredential;
      
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await createUserProfile(userCredential.user);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        await createUserProfile(userCredential.user);
      }
      
      console.log('User authenticated successfully');
    } catch (error) {
      console.error('Authentication error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const result = await signInWithPopup(auth, provider);
      await createUserProfile(result.user);
      console.log('User signed in successfully with Google');
    } catch (error) {
      console.error('Google sign in error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={handleEmailAuth}>
        {error && (
          <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
            {error}
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            disabled={loading}
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
        </button>

        <button 
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          style={{ marginLeft: '1rem' }}
        >
          {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
        </button>
      </form>

      <div className="divider" style={{ margin: '1rem 0', textAlign: 'center' }}>
        <span>OR</span>
      </div>

      <button 
        onClick={handleGoogleSignIn}
        disabled={loading}
        style={{ 
          opacity: loading ? 0.7 : 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn; 