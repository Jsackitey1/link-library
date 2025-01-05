import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';

const SignOut = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button onClick={handleSignOut}>
      Sign Out
    </button>
  );
};

export default SignOut; 